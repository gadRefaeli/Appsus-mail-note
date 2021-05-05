const { Link } = ReactRouterDOM
import { MailService } from '../services/mail-service.js'

export class MailDetails extends React.Component {

  state = {
    mail: null
  }

  componentDidMount() {
    this.loadMail()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.MailId !== this.props.match.params.MailId) {
      this.loadMail()
    }
  }

  loadMail() {
    const id = this.props.match.params.MailId
    MailService.getMailById(id).then(mail => {
      if (!mail) return this.props.history.push('/')
      this.setState({ mail })
      MailService.updateIfReading(id)
    })
   
  }
  
  onDeleteMail = () => {
    MailService.removeMail(this.state.mail.id)
      .then(() => {
        this.props.history.push('/MailApp')
      })
  }

  render() {
    const { mail } = this.state
   
    if (!mail) return <div>Loading...</div>
    var time=new Date(mail.sentAt).toLocaleString();
    return (
     
     <div className="container mail-details" >
      
         <p className="mail-details-subject">{mail.subject}</p>
         <p className="mail-details-mail"> <span>{mail.from.split('@')[0]} </span>{mail.from}</p>
         <p className="mail-details-body">{mail.body}</p>
         <p>{time}</p>
         <button onClick={this.onDeleteMail} > x</button>
        <button onClick={() => this.props.history.push('/MailApp')} > Go back</button>
        <button  onClick={() => this.props.history.push(`/MailApp/${mail.id}/replay`)} >reply</button> 
      </div >

    )
  }
}
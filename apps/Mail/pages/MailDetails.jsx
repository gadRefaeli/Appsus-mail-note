const { Link } = ReactRouterDOM
import { MailService } from '../services/mail-service.js'
import { showUserMsg } from '../services/event-bus-service.js'

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
    showUserMsg('Your mail deleted', 'error')
    MailService.removeMail(this.state.mail.id)
      .then(() => {
        this.props.history.push('/MailApp')
      })
  }

  render() {
    const { mail } = this.state

    if (!mail) return <div>Loading...</div>
    var time = new Date(mail.sentAt).toLocaleString();
    return (
<div className="Mail-details-section" >
      <div className="mail-details" >
         <div className="mail-main-bar">
           <div className="mail-main-bar-inner">
           <p className="mail-details-time">{time}</p>
          <p className="mail-details-mail"> <span>{mail.from.split('@')[0]} </span>{`<${mail.from}>`}</p>
          <p className="mail-details-subject">{mail.subject}</p>
          <p className="mail-details-body"><hr/>{mail.body}</p>
          
           </div>
         
        </div>
        <div className=" mail-details-btn">
          <h1>Mailbox</h1>
          <button onClick={() => this.props.history.push('/MailApp')}  > <img src="./img/back.png" width="20"></img>Go back</button>
          <button onClick={this.onDeleteMail} > <img src="./img/trash-white.png" width="20"></img>Delete</button>
          
          <button onClick={() => this.props.history.push(`/MailApp/${mail.id}/replay`)} ><img src="./img/replay-01.png" width="20"></img>Reply</button>
         <Link to={`/KeepApp/?subject=${mail.subject}&from=${mail.from}&body=${mail.body}&to=${mail.to}`}> <button ><img src="./img/notes-01.png" width="30"></img>Save as note</button></Link>
          
        </div>
       


      </div >
      </div>
    )
  }
}
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
    var time = new Date(mail.sentAt).toLocaleString();
    return (
<<<<<<< HEAD
     
     <div className="container mail-details" >
      
         <p className="mail-details-subject">{mail.subject}</p>
         <p className="mail-details-mail"> <span>{mail.from.split('@')[0]} </span>{mail.from}</p>
         <p className="mail-details-body">{mail.body}</p>
         <p>{time}</p>
         <button onClick={this.onDeleteMail} > x</button>
        <button onClick={() => this.props.history.push('/MailApp')} > Go back</button>
       <Link to={`/KeepApp/?subject=${mail.subject}&from=${mail.from}&body=${mail.body}&to=${mail.to}`}>save as note</Link> 
        {/* <MailToNote mail={mail} /> */}
        <button  onClick={() => this.props.history.push(`/MailApp/${mail.id}/replay`)} >reply</button> 
     
=======

      <div className="mail-details" >
         <div className="mail-main-bar">
           <div className="mail-main-bar-inner">
           <p className="mail-details-time">{time}</p>
          <p className="mail-details-mail"> <span>{mail.from.split('@')[0]} </span>{`<${mail.from}>`}</p>
          <p className="mail-details-subject">{mail.subject}</p>
          <p className="mail-details-body"><hr/>{mail.body}</p>
          
           </div>
         
        </div>
        <div className=" mail-details-btn mail-side-bar">
          <h1>Mailbox</h1>
          <button onClick={() => this.props.history.push('/MailApp')}  > <img src="/assets/img/back.png" width="20"></img>Go back</button>
          <button onClick={this.onDeleteMail} > <img src="/assets/img/trash-white.png" width="20"></img>Delete</button>
          
         {/* <MailToNote mail={mail} /> */}
          <button onClick={() => this.props.history.push(`/MailApp/${mail.id}/replay`)} ><img src="/assets/img/replay-01.png" width="20"></img>Reply</button>
          <button onClick={() => this.props.history.push(`/MailApp/${mail.id}/replay`)} ><img src="/assets/img/notes-01.png" width="30"></img>Save as note</button>
          
        </div>
       


>>>>>>> d96caf35d735c4a800d62ee49d676325df134f21
      </div >

    )
  }
}
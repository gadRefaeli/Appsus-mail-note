import { MailService } from './services/mail-service.js'
const { Link } = ReactRouterDOM
export class Mailreplay extends React.Component {

  state = {
    mail: {
      // subject: '',
      // to:  'Me@gmail.com',
      // body: '',
      // from:''
    }
  }



  componentDidMount() {
  
    this.loadMail()

  }

  loadMail() {
    const id = this.props.match.params.MailId;
    MailService.getMailById(id).then(mail => {
      if (!mail) return this.props.history.push('/')
      var tempMail=mail;
      mail.to=tempMail.from;
      mail.from=tempMail.to;
      mail.subject=`re: ${tempMail.subject}`
      this.setState( {mail} )

    })
  }


  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState(prevState => ({
      mail: {
        ...prevState.mail,
        [field]: value
      }
    }))
  }

  onSaveMail = (ev) => {
    ev.preventDefault()
    MailService.addMail(this.state.mail).then(() => {
     return this.props.history.push('/MailApp')
    })
  }


  render() {
    const { subject, to, body, from } = this.state.mail
    return (
      <div className="Mail-details-section">

      <form className="mail-add mail-details" onSubmit={this.onSaveMail}>
        <div className="mail-main-bar">
          <div className="mail-main-bar-inner">
          <h1 className="title-mail-details">Replay mail:</h1>
            <label><span>Subject</span><br/>
        <input type="text" name="subject" value={subject} onChange={this.handleChange} required />
            </label>
            <label><span>To</span><br/>
        <input type="text" name="to" value={to} onChange={this.handleChange} required />
            </label>
            <label><span>Body</span><br/>
      <textarea type="text" name="body" cols="40" rows="10" value={body} onChange={this.handleChange} required></textarea>
            </label>
          </div>
        </div>
        <div className=" mail-details-btn">
          <h1>Mailbox</h1>
          <button type="submit"><img src="./img/send-01.png" width="30"></img>Send</button>
          <button onClick={() => this.props.history.push('/MailApp')}> <img src="./img/back.png" width="20"></img>Go back</button>
        </div>
      </form>
    </div >
    )
  }
}
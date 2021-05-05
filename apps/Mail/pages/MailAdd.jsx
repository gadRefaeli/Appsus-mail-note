import { MailService } from './services/mail-service.js'
const { Link } = ReactRouterDOM
export class MailAdd extends React.Component {

  state = {
    mail: {
      subject: '',
      to: '',
      body: '',
      from: 'Me@gmail.com'
    }
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
      <form className="mail-add" onSubmit={this.onSaveMail}>
        <label>subject
          <input type="text" name="subject" value={subject} onChange={this.handleChange} />
        </label>
        <label>to
          <input type="text" name="to" value={to} onChange={this.handleChange} />
        </label>
        <label>body
          <input type="text" name="body" value={body} onChange={this.handleChange} />
        </label>
        {/* <label>from
          <input type="text" name="from" value={from} onChange={this.handleChange} />
        </label> */}
       

        
        <button type="submit">send</button>
        <button onClick= {() =>this.props.history.push('/MailApp')}>cancle</button>
        
      </form>
    )
  }
}
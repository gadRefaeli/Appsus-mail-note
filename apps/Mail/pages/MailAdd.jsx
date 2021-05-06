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
      <div className="compose">
        <form className="mail-add" onSubmit={this.onSaveMail}>
          <label>subject
          <input type="text" name="subject" value={subject} onChange={this.handleChange} required />
          </label>
          <label>to
          <input type="text" name="to" value={to} onChange={this.handleChange} required />
          </label>
          <label>body
        <textarea type="text" name="body" cols="40" rows="10" value={body} onChange={this.handleChange} required></textarea>
          </label>
          <button type="submit">send</button>
          <button onClick={() => this.props.history.push('/MailApp')}>cancle</button>
        </form>
      </div>

    )
  }
}
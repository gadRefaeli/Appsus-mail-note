const { Link } = ReactRouterDOM
import { MailService } from './services/mail-service.js'
export class MailPreview extends React.Component {
 
  state = {
    mail: null,
    removed: false,
    isRead:null
  }
  componentDidMount() {
    this.loadMail()
  }

  loadMail() {
    const mail =this.props.name
    this.setState({ mail })
    this.setState({isRead:mail.isRead})
  }

  removePreviewedMail= () =>{
    MailService.removeMail(this.props.name.id)
    .then(() => {
      this.setState({removed: true })
    })
  }



  taggleIsReading = () =>{
    MailService.taggleReading(this.props.name.id)
    .then(() => {
      this.setState({isRead:!this.state.isRead})
    })
  }


  render() {
    var readingOn=(this.state.isRead)? 'reading':'not-reading';
    var mail =this.props.name
    if(this.state.removed) return (null)
  return (
    <article className={`mail-preview ${readingOn}`}>
      <button onClick={this.taggleIsReading}> Mark read</button>
      <button onClick={this.removePreviewedMail}> x</button>
      <div className="first-chart">
        {mail.from.charAt(0).toUpperCase()}
      </div>
      <Link to={`/MailApp/${mail.id}/`}>
        <p>{mail.from.split('@')[0]} </p>
        <p>{mail.from}</p>
        <p>{mail.subject}</p>
        <p>{mail.body.substring(0, 30) + '...'}</p>
        <p>{mail.sentAt}</p>

      </Link>
    </article>
  )
  }
}
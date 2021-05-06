const { Link } = ReactRouterDOM
import { MailService } from './services/mail-service.js'
export class MailPreview extends React.Component {

  state = {
    mail: null,
    removed: false,
    isRead: null,
    count: null,
    isStar: false
  }
  componentDidMount() {
    this.loadMail()
  }

  loadMail() {
    const mail = this.props.name
    this.setState({ mail })
    this.setState({ isRead: mail.isRead })

  }
  componentDidUpdat() {
    this.setState({ count: this.props.getMailCount })
  }

  removePreviewedMail = () => {
    this.props.removePreviewedMail(this.props.name.id)
    this.setState({ removed: true })
  }


  taggleIsReading = () => {
    this.props.taggleIsReading(this.props.name.id)
    this.setState({ isRead: !this.state.isRead })
  }
  taggleIsStared = () => {
    this.props.taggleIsStared(this.props.name.id)
    this.setState({ isStar: !this.state.isStar })
  }

  render() {
    var readingOn = (this.state.isRead) ? 'reading' : 'not-reading';
    var stared = (this.state.isStar) ? 'stared' : 'not-stared';
    var mail = this.props.name

    var time = new Date(mail.sentAt).toLocaleString();
    if (this.state.removed) return (null)
    return (
      <article className={`mail-preview ${readingOn}`}>
        <span className="first-chart">{mail.from.charAt(0).toUpperCase()}</span>
        <div className="details-preview" >
          <Link to={`/MailApp/${mail.id}/`}>
            <p className="details-preview-from-title">{mail.from.split('@')[0]} <span className="details-preview-time" >{time}</span> </p>
            <span className="details-preview-from" >{mail.from}</span><br></br>
            <span className="details-preview-subject" >{mail.subject}</span><br></br>
            <span className="details-preview-body" >{mail.body.substring(0, 55) + '...'}</span>

          </Link>
        </div>


        <button onClick={this.taggleIsReading}> Mark read</button>
        <button className={stared} onClick={this.taggleIsStared}>star</button>
        <button onClick={this.removePreviewedMail}> x</button>

      </article>
    )
  }
}
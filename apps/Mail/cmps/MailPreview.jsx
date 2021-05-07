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
    var env = (this.state.isRead) ? 'close-env' : 'open-env';
    var stared = (this.state.isStar) ? 'stared' : 'not-stared';
    var mail = this.props.name

    var time = new Date(mail.sentAt).toLocaleString();
    if (this.state.removed) return (null)
    return (
      <article className={`mail-preview ${readingOn}`}>
        <div className="first-chart-div"> 
        <span className="first-chart">{mail.from.charAt(0).toUpperCase()}</span>
        </div>
 
        <div className="details-preview" >
          <Link to={`/MailApp/${mail.id}/`}>
            <span className="details-preview-from-title">{mail.from.split('@')[0]}  </span>
            <span className="details-preview-from" >{`<${mail.from}>`}</span><br></br>
            <p className="details-preview-time" >{time}</p>
            
          </Link>
        </div>
        <div className="inner-details-preview" >
          <Link to={`/MailApp/${mail.id}/`}>
            <span className="details-preview-subject" >{mail.subject}</span><br></br>
            <span className="details-preview-body" >{mail.body.substring(0, 50) + '...'}</span>
          </Link>
        </div>
          <button className={`${env} taggle-reading`} onClick={this.taggleIsReading}> </button>
         
          <button className= {`${stared} marker`} onClick={this.taggleIsStared}></button>
         
          <button  className="close-preview" onClick={this.removePreviewedMail}> </button>
       
      </article>
    )
  }
}
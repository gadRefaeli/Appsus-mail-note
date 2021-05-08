import { eventBusService } from '../services/event-bus-service.js'
import { MailService } from '../services/mail-service.js'
export class MailFilter extends React.Component {


  state = {
    filterBy: {
      search: '',
      read: null,
      star:false,
      mailReadCount: 0,
      mailUnreadCount: 0
      
    },
  }

  // componentDidMount() {
  //   this.removeEvent = eventBusService.on('mail-read-count', (mailReadCount) => {
  //     this.setState({ mailReadCount })
  //   })
  //   this.removeEvent = eventBusService.on('mail-unread-count', (mailUnreadCount) => {
  //     this.setState({ mailUnreadCount })
  //   })
  // }

  

  handleChange = (ev) => {
    
    const field = ev.target.name
    let value = ev.target.value;
    if(field!=='star'){
      this.setState(({ filterBy }) => ({
        filterBy: { ...filterBy, ['star']: false}
      }))}
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    if (value === 'null') value = null;
    this.setState(({ filterBy }) => ({
      filterBy: { ...filterBy, [field]: value }
    }), () => {
      this.props.onSetFilter(this.state.filterBy)
    })
  
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filterBy)
  }

  render() {
    const { search, read,star } = this.state.filterBy
    return (

      <form className="mail-filter" onSubmit={this.onFilter}>
        <button name="star" value="true" onClick={this.handleChange} >Stared Mails</button>
        <button name="read" value="null" onClick={this.handleChange} >All Mails </button>
        <button name="read" value="true" onClick={this.handleChange} >Read Mails</button>
        <button name="read" value="false" onClick={this.handleChange} >Unread Mails</button>
        
    
      </form>
    )
  }
}
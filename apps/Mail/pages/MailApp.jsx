const { Link } = ReactRouterDOM
import { MailService } from '../services/mail-service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { eventBusService } from '../services/event-bus-service.js'
export class MailApp extends React.Component {
    removeEvent;
    state = {
        mails: null,
        filterBy: {
            search: '',
            read: null,
        },
        sortBy: 'date',
        allMailCount: null,
        readMailCount: null,
        unreadMailCount: null

        
    }
      


    getMailCount(){
        this.setState({readMailCount:MailService.getMailLengthByFilter(true)})
        eventBusService.emit('mail-read-count', this.state.readMailCount)
        this.setState({unreadMailCount:MailService.getMailLengthByFilter(false)}) 
        eventBusService.emit('mail-unread-count', this.state.unreadMailCount)
      }

    componentDidMount() {
        this.loadMails();
        this.getMailCount()
    }

    componentDidUpdate(){
      


        
    }

    loadMails() {
        
        MailService.query(this.state.filterBy, this.state.sortBy)
            .then((mails) => {
                this.setState({ mails })
                this.getMailCount()
                eventBusService.emit('mail-count', mails.length)
            })
            this.getMailCount();
    }

    onSetFilter = (filterBy) => {

        this.setState({ filterBy: { ...this.state.filterBy, ...filterBy } }, this.loadMails)

    }

    SortMails = (ev) => {
        const sortBy = ev.target.name
        console.log(sortBy)
        this.setState({ sortBy }, this.loadMails)
    }

    render() {
        const { mails } = this.state
        if (!mails) return <div>Loading...</div>

        return (
            <section className="Mail-list-section">
                <div className="sorting">
                    <p> Sort by:</p>
                    <button className="sort-by-title" name="subject" onClick={this.SortMails}> Title </button>
                    <button className="sort-by-date" name="date" onClick={this.SortMails}> Date </button>
                </div>

                <div className="mail-side-bar">
                    <button><Link to="/MailApp/compose">compose</Link> </button>
                    <MailFilter onSetFilter={this.onSetFilter} />
                </div>

                <MailList mails={mails} />
            </section>
        )
    }
}
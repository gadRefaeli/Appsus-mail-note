import { MailService } from '../services/mail-service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailList.jsx'
export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: {
            search: '',
            read: false,
            unread: false,
        },
    }
    componentDidMount() {
        this.loadMails();
    }

    loadMails() {
        MailService.query(this.state.filterBy)
            .then((mails) => {
                this.setState({ mails })
            })
    }
    onSetFilter = (filterBy) => {
        
        this.setState({ filterBy: { ...this.state.filterBy, ...filterBy } }, this.loadMails)
        
    }


    render() {
        const { mails } = this.state
        if (!mails) return <div>Loading...</div>
        return (
            <section className="Mail-list-section">
                {/* <MailFilter onSetFilter={this.onSetFilter} /> */}
                <MailList mails={mails} />
            </section>
        )
    }
}
import { MailService } from '../services/mail-service.js'
import { MailList } from '../cmps/MailList.jsx'
export class MailApp extends React.Component {

    state = {
        mails: null,
    }
    componentDidMount() {
        this.loadMails();
    }

    loadMails() {
        MailService.query()
            .then((mails) => {
                this.setState({ mails })
            })
    }

    render() {
        const { mails } = this.state
        if (!mails) return <div>Loading...</div>
        return (
            <section className="Mail-list-section">
                <MailList mails={mails} />
            </section>
        )
    }
}
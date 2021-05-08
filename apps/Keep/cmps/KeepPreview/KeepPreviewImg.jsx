const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { showUserMsg } from '../services/event-bus-service.js'

export class KeepPreviewImg extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        let noteId = this.props.note.id
        keepService.getNoteById(noteId)
            .then(note => this.setState({note}))
    }

    setColor = (ev) => {
        let currNote = this.state.note
        currNote.style.backgroundColor = `${ev.target.value}`
        this.setState({ note: currNote })
        keepService.saveNote(currNote)
    }

    togglePinned = () => {
        let currNote = this.state.note
        currNote.isPinned = !currNote.isPinned
        this.setState({ note: currNote })
        keepService.saveNote(currNote)
    }

    setQryStr = () => {
        const { note } = this.state
        const str = `Image URL: ${note.info.url}`
        const subject = `${note.info.title}`
        const qryStr = `/MailApp/compose/?subject=${subject}&to=example@gmail.com&body=${str}`
        return qryStr
    }

    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Downloading...</div>
        const currBgColor = (!note.style.backgroundColor) ? '#ffffff' : note.style.backgroundColor
        const qryStr = this.setQryStr()
        return (
            <article className="note-preview" key={note.id} style={{ backgroundColor: currBgColor }}>
                <img src={note.info.url} />
                <h4>{note.info.title}</h4>
                <button className={`btn-pin ${note.isPinned}`} onClick={() => {this.togglePinned(); loadNotes()}}></button>
                <NavLink className="btn-mail" to={qryStr}></NavLink>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" loadNotes={loadNotes} to={`/KeepApp/${note.id}/`}></NavLink>
                <button className="btn-remove" onClick={() => { showUserMsg('Your note deleted', 'error'); keepService.removeNote(note.id); loadNotes() }}></button>
            </article>
        )
    }
}
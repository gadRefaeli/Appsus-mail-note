const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'

export class KeepPreviewVideo extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
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
        const str = `Video URL: ${note.info.url}`
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
            <div className="note-preview" key={note.id} style={{ backgroundColor: currBgColor }}>
                <div className="video-player-container">
                    <iframe width="240" height="180" src={note.info.url}>
                    </iframe>
                </div>
                <h4>{note.info.title}</h4>
                <button className={`btn-pin ${note.isPinned}`} onClick={() => {this.togglePinned(); loadNotes()}}></button>
                <NavLink className="btn-mail" to={qryStr}></NavLink>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}></NavLink>
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); loadNotes() }}></button>
            </div>
        )
    }
}

// https://www.youtube.com/embed/07pzfamaI9E
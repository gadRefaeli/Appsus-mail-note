const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { MailService } from '../../../Mail/services/mail-service.js'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'

export class KeepPreviewTxt extends React.Component {
    state = {
       note: null
    }
    
    componentDidMount() {
        this.setState({note: this.props.note})
    }

    setColor = (ev) => {
        let currNote = this.state.note
        currNote.style.backgroundColor = `${ev.target.value}`
        this.setState({note:  currNote})
        keepService.saveNote(currNote)
    }

    togglePinned = () => {
        let currNote = this.state.note
        currNote.isPinned = !currNote.isPinned
        this.setState({note:  currNote})
        keepService.saveNote(currNote)
    }

    onSendToMail = (note) => {
        
        console.log(qryStr)
    }

    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Downloading...</div>
        const currBgColor = (!note.style.backgroundColor)? '#ffffff' : note.style.backgroundColor
        const str = note.info.txt.join(',')
        const idx = str.indexOf(' ')
        const subject = str.slice(0, idx)
        const qryStr = `/MailApp/compose/?subject=${subject}&to=example@gmail.com&body=${str}&from=Me@gmail.com`        
        return (
            <article className="note-preview" key={note.id} style={{backgroundColor: currBgColor}}>
                {note.info.txt.map(line => {
                    return <p>{line}</p>
                })}
                <NavLink className="btn-mail" to={qryStr}>Mail</NavLink>
                <button className={`btn-pin ${note.isPinned}`} onClick={() => {this.togglePinned(); loadNotes()}}></button>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}>Edit</NavLink>
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); loadNotes() }}>Delete</button>
            </article>
        )
    }
}
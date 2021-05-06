const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'

export class NotePreviewTxt extends React.Component {
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

    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Downloading...</div>
        let currBgColor = (!note.style.backgroundColor)? '#ffffff' : note.style.backgroundColor
                
        return (
            <article className="note-preview" key={note.id} style={{backgroundColor: currBgColor}}>
                {note.info.txt.map(line => {
                    return <p>{line}</p>
                })}
                <button className="btn-pin" onClick={() => {this.togglePinned(); loadNotes()}}>Pin</button>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}>Edit</NavLink>
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); loadNotes() }}>Delete</button>
            </article>
        )
    }
}
const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { LongTxt } from '../LongTxt.jsx'
import { showUserMsg } from '../services/event-bus-service.js'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'

export class KeepPreviewTxt extends React.Component {
    state = {
       note: null,
       isReadMore: false
    }
    
    componentDidMount() {
        let noteId = this.props.note.id
        keepService.getNoteById(noteId)
            .then(note => this.setState({note}))
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

    toggleRead = () => {
        this.setState({ isReadMore: !this.state.isReadMore })
    }

    setQryStr = () => {
        const { note } = this.state
        let str = ''
        if (note.info.txt) str = note.info.txt.join(',')
        const idx = str.indexOf(' ')
        const subject = str.slice(0, idx)
        const qryStr = `/MailApp/compose/?subject=${subject}&to=example@gmail.com&body=${str}`  
        return qryStr
    }

    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Downloading...</div>
        const currBgColor = (!note.style.backgroundColor)? '#ffffff' : note.style.backgroundColor
        const qryStr = this.setQryStr()           
        return (
            <article className="note-preview" key={note.id} style={{backgroundColor: currBgColor}}>
                <LongTxt txt={note.info.txt} isReadMore={this.state.isReadMore} toggleRead={this.toggleRead} />
                <button className={`btn-pin ${note.isPinned}`} onClick={() => {this.togglePinned(); loadNotes()}}></button>
                <NavLink className="btn-mail" to={qryStr}></NavLink>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}></NavLink>
                <button className="btn-remove" onClick={() => { showUserMsg('Your note deleted', 'error'); keepService.removeNote(note.id); loadNotes() }}></button>
            </article>
        )
    }
}
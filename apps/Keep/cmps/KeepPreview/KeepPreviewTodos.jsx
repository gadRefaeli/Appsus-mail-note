const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { showUserMsg } from '../services/event-bus-service.js'
import { LongTodos } from '../LongTodos.jsx'

export class KeepPreviewTodos extends React.Component {
    state = {
        note: null,
        currTxt: {},
        isReadMore: false
    }

    componentDidMount() {
        let noteId = this.props.note.id
        keepService.getNoteById(noteId)
            .then(note => {
                this.setState({note}, this.printLines(note))
            })
    }

    printLines = (note) => {
        const currNote = note
        var gTxt = {}
        if (currNote.info.txt) {
            currNote.info.txt.forEach(line => {
                gTxt[line.id] = line.isDone
            })
        }
        this.setState({ currTxt: gTxt })
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

    handleInputChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(prevState => ({
            currTxt: {
                ...prevState.currTxt,
                [field]: value
            }
        }))
        let currNote = this.state.note
        let currLine = currNote.info.txt.findIndex(line => {
            return line.id === field
        })
        currNote.info.txt[currLine].isDone = value
        this.setState({ note: currNote })
        keepService.saveNote(this.state.note)
    }

    toggleRead = () => {
        this.setState({ isReadMore: !this.state.isReadMore })
    }

    setQryStr = () => {
        const { note } = this.state
        const str = note.info.txt.map(line => {
            return `${(line.isDone) ? 'Done:' : 'NOT Done:'} ${line.str}`
        }).join('\n')
        const subject = 'Todos list'
        const qryStr = `/MailApp/compose/?subject=${subject}&to=example@gmail.com&body=${str}`
        return qryStr
    }

    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Loading...</div>
        const currBgColor = (!note.style.backgroundColor) ? '#ffffff' : note.style.backgroundColor
        const qryStr = this.setQryStr()
        const { currTxt } = this.state
        return (
            <article className="note-preview" key={note.id} style={{ backgroundColor: currBgColor }}>   
                {note.info.txt.map(line => {
                    return <p key={line.id}><input type="checkbox" id={line.id} name={line.id} checked={currTxt[line.id]} onChange={this.handleInputChange} />
                        <label htmlFor={line.id}>{' ' + line.str}</label></p>
                })}
                <button className={`btn-pin ${note.isPinned}`} onClick={() => { this.togglePinned(); loadNotes() }}></button>
                <NavLink className="btn-mail" to={qryStr}></NavLink>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}></NavLink>
                <button className="btn-remove" onClick={() => { showUserMsg('Your note deleted', 'error'); keepService.removeNote(note.id); this.props.loadNotes() }}></button>
            </article>
        )
    }
}
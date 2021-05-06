const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'

export class KeepPreviewTodos extends React.Component {
    state = {
        note: null,
        currTxt: {}
    }
    gNote = this.props.note

    componentDidMount() {
        this.setState({note: this.props.note})
        var gTxt = {}
        this.props.note.info.txt.forEach(line => {
            gTxt[line.id] = line.isDone
        })
        this.setState({currTxt: gTxt})
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

    handleInputChange = ({ target}) => {
        const field = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        this.setState(prevState => ({
            currTxt: {
                ...prevState.currTxt,
                [field]:  value
            }
        }))
        let currNote = this.state.note
        let currLine = currNote.info.txt.findIndex(line => {
            return line.id === field
        })
        currNote.info.txt[currLine].isDone = value
        this.setState({note: currNote})
        keepService.saveNote(this.state.note)
      }
    
    render() {
        const { loadNotes } = this.props
        const { note } = this.state
        if (!note) return <div>Loading...</div> 
        let currBgColor = (!note.style.backgroundColor)? '#ffffff' : note.style.backgroundColor
        const { currTxt } = this.state
        return (
            <article className="note-preview" key={note.id} style={{backgroundColor: currBgColor}}>
                {note.info.txt.map(line => {
                    const lineId = line.id
                    return <p key={line.id}><input type="checkbox" id={line.id} name={line.id}  checked={currTxt[lineId]} onChange={this.handleInputChange}/>
                    <label htmlFor={line.id}>{' ' + line.str}</label></p>
                })}
                <button className={`btn-pin ${note.isPinned}`} onClick={() => {this.togglePinned(); loadNotes()}}></button>
                <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input>
                <NavLink className="btn-update" to={`/KeepApp/${note.id}/`}>Edit</NavLink>
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); this.props.loadNotes() }}>Delete</button>
            </article>
        )
    }
}
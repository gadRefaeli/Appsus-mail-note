const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { LongTodos } from '../LongTodos.jsx'

export class KeepPreviewTodos extends React.Component {
    state = {
        note: null,
        currTxt: {},
        isReadMore: false
    }
    gNote = this.props.note

    componentDidMount() {
        this.setState({ note: this.props.note })
        var gTxt = {}
        if (this.props.note.info.txt) {
            console.log(this.props.note.info.txt)
            this.props.note.info.txt.forEach(line => {
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
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); this.props.loadNotes() }}></button>
            </article>
        )
    }
}

// {note.info.txt.map(line => {
//     return <p key={line.id}><input type="checkbox" id={line.id} name={line.id} checked={currTxt[line.id]} onChange={this.handleInputChange} />
//         <label htmlFor={line.id}>{' ' + line.str}</label></p>
// })}

{/* <LongTodos txt={note.info.txt} isReadMore={this.state.isReadMore} toggleRead={this.toggleRead}
                 currTxt={currTxt} handleInputChange={this.handleInputChange} /> */}
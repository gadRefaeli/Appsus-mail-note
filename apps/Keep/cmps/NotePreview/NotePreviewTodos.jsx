import { keepService } from '../../services/keep-service.js'

export class NotePreviewTodos extends React.Component {
    state = {
        note: null,
        txt: null
    }
    gNote = this.props.note

    componentDidMount() {
        this.setState({note: this.props.note})
        var gTxt = {}
        this.props.note.info.txt.forEach(line => {
            gTxt[line.id] = line.isDone
        })
        this.setState({txt: gTxt})
        console.log(gTxt)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState => ({
            txt: {
                ...prevState.txt,
                [name]: { value }
            }
        })) 
      }
    
    render() {
        const { note } = this.state
        if (!note) return <div>Loading...</div> 
        const { txt } = note.info
        return (
            <article className="note-preview" key={note.id}>
                {txt.map((line, idx) => {
                    console.log(txt[idx])
                    this.State
                    return <p key={line.id}><input type="checkbox" id={line.id} name={line.id}  checked={txt[idx].isDone} onChange={this.handleInputChange}/>
                    <label htmlFor={line.id}>{' ' + line.str}</label></p>
                })}
                {/* {this.props.note.isPinned && <p>PINNED</p>} */}
                <button className="btn-remove" onClick={() => { keepService.removeNote(note.id); this.props.loadNotes() }}>Delete</button>
            </article>
        )
    }
}
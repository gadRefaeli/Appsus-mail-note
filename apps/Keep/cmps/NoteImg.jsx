import { keepService } from '../services/keep-service.js'

export class NoteImg extends React.Component {
    state = {
        note: {
            type: 'noteImg',
            isPinned: false,
            info: {
                url: '',
                title: ''
            },
            style: null
        }
    }
    
    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                info: { txt: value }
            }
        }))
    }

    onSaveNote = () => {
        const { note } = this.state
        if (!note.info.txt) return
        let currNote = this.state.note
        keepService.saveNote(currNote)
            .then(() => {
                this.props.loadNotes()
            })        
    }

    render() {
        const { txt } = this.state.note.info
        return (
            <section className="note-txt-container">
                <div className="note-txt-controller">
                <div>
                <input className="input-note-txt" type="text" ref={this.inputRef} name="info.url" value={txt} placeholder="Enter img URL..." onChange={this.handleChange} />
                <input className="input-note-txt" type="text" name="info.title" value={txt} placeholder="Enter title..." onChange={this.handleChange} />
                </div>
                <nav className="nav-note">
                    <button onClick={() => {this.props.setNoteMode('noteTxt')}}>A</button>
                    <button className="btn-active" onClick={() => {this.props.setNoteMode('noteImg')}}>Img</button>
                    <button onClick={() => {this.props.setNoteMode('noteVideo')}}>video</button>
                    <button onClick={() => {this.props.setNoteMode('noteTodos')}}>todo</button>
                </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
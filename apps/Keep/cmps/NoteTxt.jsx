import { keepService } from '../services/keep-service.js'

export class NoteTxt extends React.Component {
    state = {
        note: {
            type: 'noteTxt',
            isPinned: false,
            info: {
                txt: ''
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
                <input className="input-note-txt" type="text" ref={this.inputRef} name="info.txt" value={txt} placeholder="Enter text..." onChange={this.handleChange} />
                <nav className="nav-note">
                    <button className="btn-active" onClick={() => {this.props.setNoteMode('noteTxt')}}>A</button>
                    <button onClick={() => {this.props.setNoteMode('noteImg')}}>Img</button>
                    <button onClick={() => {this.props.setNoteMode('noteVideo')}}>video</button>
                    <button onClick={() => {this.props.setNoteMode('noteTodos')}}>todo</button>
                </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
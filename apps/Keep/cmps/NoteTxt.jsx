import { keepService } from '../services/keep-service.js'

export class NoteTxt extends React.Component {
    state = {
        note: {
            type: 'NoteTxt',
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
        let currNote = note
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
                <input className="input-note-txt" type="text" ref={this.inputRef} name="txt" value={txt} placeholder="Enter text..." onChange={this.handleChange} />
                <nav className="nav-note">
                    <button className="btn-active" onClick={() => {this.props.setNoteMode('NoteTxt')}}>A</button>
                    <button onClick={() => {this.props.setNoteMode('NoteImg')}}>Img</button>
                    <button onClick={() => {this.props.setNoteMode('NoteVideo')}}>video</button>
                    <button onClick={() => {this.props.setNoteMode('NoteTodos')}}>todo</button>
                </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
import { keepService } from '../services/keep-service.js'

export class AddNoteTxt extends React.Component {
    state = {
        note: {
            type: 'NoteTxt',
            isPinned: false,
            info: {
                txt: ''
            },
            style: {
                backgroundColor: '#ffffff'
            }
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
        note.info.txt = note.info.txt.split('\n')
        keepService.saveNote(note)
            .then(() => {
                this.props.loadNotes()
            })        
    }

    render() {
        const { txt } = this.state.note.info
        return (
            <section className="add-note-container">
                <div className="add-note-controller">
                <textarea className="textarea-add-note" ref={this.inputRef} name="txt" value={txt} placeholder="Enter text..." onChange={this.handleChange} />
                <nav className="nav-add-note">
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
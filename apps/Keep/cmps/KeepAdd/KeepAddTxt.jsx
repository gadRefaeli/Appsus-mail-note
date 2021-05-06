import { keepService } from '../services/keep-service.js'

export class KeepAddTxt extends React.Component {
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
                        <button className="btn-txt btn-active" onClick={() => { this.props.setNoteMode('NoteTxt') }}></button>
                        <button className="btn-img" onClick={() => { this.props.setNoteMode('NoteImg') }}></button>
                        <button className="btn-video" onClick={() => { this.props.setNoteMode('NoteVideo') }}></button>
                        <button className="btn-list" onClick={() => { this.props.setNoteMode('NoteTodos') }}></button>
                    </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
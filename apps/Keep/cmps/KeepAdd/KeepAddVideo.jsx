import { keepService } from '../services/keep-service.js'
import { showUserMsg } from '../services/event-bus-service.js'

export class KeepAddVideo extends React.Component {
    state = {
        note: {
            type: 'NoteVideo',
            isPinned: false,
            info: {
                url: '',
                title: ''
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
        if (target.name === 'url') {
            this.setState(prevState => ({
                note: {
                    ...prevState.note,
                    info: { url: value, title: prevState.note.info.title }
                }
            }))
        } else if (target.name === 'title') {
            this.setState(prevState => ({
                note: {
                    ...prevState.note,
                    info: { title: value, url: prevState.note.info.url }
                }
            }))
        }
    }

    onSaveNote = () => {
        const { note } = this.state
        let currNote = note
        keepService.saveNote(currNote)
            .then(() => {
                this.props.loadNotes()
            })
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                info: { title: '', url: '' }
            }
        }))
        showUserMsg('Your note saved', 'success')
        this.inputRef.current.focus()
    }

    render() {
        const { url, title } = this.state.note.info
        return (
            <section className="add-note-container">
                <div className="add-note-controller">
                    <nav className="nav-add-note">
                        <button className="btn-txt" onClick={() => { this.props.setNoteMode('NoteTxt') }}></button>
                        <button className="btn-img" onClick={() => { this.props.setNoteMode('NoteImg') }}></button>
                        <button className="btn-video btn-active" onClick={() => { this.props.setNoteMode('NoteVideo') }}></button>
                        <button className="btn-list" onClick={() => { this.props.setNoteMode('NoteTodos') }}></button>
                    </nav>
                    <div>
                        <input className="input-add-note" type="text" ref={this.inputRef} name="url" value={url} placeholder="Enter video URL..." onChange={this.handleChange} />
                        <br />
                        <input className="input-add-note" type="text" name="title" value={title} placeholder="Enter title..." onChange={this.handleChange} />
                    </div>

                    <button className="keep-save" onClick={this.onSaveNote}>Save note</button>
                </div>

            </section>
        )
    }
}
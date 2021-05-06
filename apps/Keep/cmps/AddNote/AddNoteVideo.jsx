import { keepService } from '../services/keep-service.js'

export class AddNoteVideo extends React.Component {
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
    }

    render() {
        const { url, title } = this.state.note.info
        return (
            <section className="add-note-container">
                <div className="add-note-controller">
                    <div>
                        <input className="input-add-note" type="text" ref={this.inputRef} name="url" value={url} placeholder="Enter video URL..." onChange={this.handleChange} />
                        <input className="input-add-note" type="text" name="title" value={title} placeholder="Enter title..." onChange={this.handleChange} />
                    </div>
                    <nav className="nav-add-note">
                        <button onClick={() => { this.props.setNoteMode('NoteTxt') }}>A</button>
                        <button onClick={() => { this.props.setNoteMode('NoteImg') }}>Img</button>
                        <button className="btn-active" onClick={() => { this.props.setNoteMode('NoteVideo') }}>video</button>
                        <button onClick={() => { this.props.setNoteMode('NoteTodos') }}>todo</button>
                    </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
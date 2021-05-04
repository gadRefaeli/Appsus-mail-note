import { keepService } from '../services/keep-service.js'

export class NoteImg extends React.Component {
    state = {
        note: {
            type: 'NoteImg',
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
            <section className="note-txt-container">
                <div className="note-txt-controller">
                    <div>
                        <input className="input-note-txt" type="text" ref={this.inputRef} name="url" value={url} placeholder="Enter img URL..." onChange={this.handleChange} />
                        <input className="input-note-txt" type="text" name="title" value={title} placeholder="Enter title..." onChange={this.handleChange} />
                    </div>
                    <nav className="nav-note">
                        <button onClick={() => { this.props.setNoteMode('NoteTxt') }}>A</button>
                        <button className="btn-active" onClick={() => { this.props.setNoteMode('NoteImg') }}>Img</button>
                        <button onClick={() => { this.props.setNoteMode('NoteVideo') }}>video</button>
                        <button onClick={() => { this.props.setNoteMode('NoteTodos') }}>todo</button>
                    </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
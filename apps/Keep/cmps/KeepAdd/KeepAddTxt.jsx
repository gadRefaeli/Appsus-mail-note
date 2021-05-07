import { keepService } from '../services/keep-service.js'
import { showUserMsg } from '../services/event-bus-service.js'

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
        const searchParams = new URLSearchParams(this.props.location.search);
        const subject = searchParams.get('subject')
        const from = searchParams.get('from')
        const body = searchParams.get('body')
        const to = searchParams.get('to')
        const txt = `from: ${from}\nto: ${to}\nsubject: ${subject}\nbody: ${body}`
        if (body) {
            const note = { type: 'NoteTxt', isPinned: false, info: { txt: txt }, style: { backgroundColor: '#ffffff' } }
            this.setState({ note })
        }
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
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                info: { txt: '' }
            }
        }))
        showUserMsg('Your note saved', 'success')
        this.inputRef.current.focus()
    }

    render() {
        const { txt } = this.state.note.info
        return (
            <section className="add-note-container">
                <div className="add-note-controller">
                <nav className="nav-add-note">
                        <button className="btn-txt btn-active" onClick={() => { this.props.setNoteMode('NoteTxt') }}></button>
                        <button className="btn-img" onClick={() => { this.props.setNoteMode('NoteImg') }}></button>
                        <button className="btn-video" onClick={() => { this.props.setNoteMode('NoteVideo') }}></button>
                        <button className="btn-list" onClick={() => { this.props.setNoteMode('NoteTodos') }}></button>
                    </nav>
                    <textarea className="textarea-add-note" ref={this.inputRef} name="txt" value={txt} placeholder="Enter text..." onChange={this.handleChange} />
                    
                    <button  className="keep-save" onClick={this.onSaveNote}>Save note</button>
           
                </div>
              </section>
        )
    }
}
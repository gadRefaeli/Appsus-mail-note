const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'

export class UpdateNoteTxt extends React.Component {
    state = {
        note: null
    }
    
    inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()  // Got error
        this.props.note.info.txt = this.props.note.info.txt.join('\n')
        console.log(this.props.note.info.txt)
        this.setState({note: this.props.note})
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
                this.setState({note})
            })        
    }

    render() { 
        if (!this.state.note) return <div>Downloading...</div>
        let { note } = this.state
        let { txt } = note.info
        return (
            <article className="update-note">

                <textarea className="textarea-edit-note" ref={this.inputRef} name="txt" 
                value={txt} placeholder="Enter text..." onChange={this.handleChange}></textarea>

                {note.isPinned && <p>PINNED</p>}
                <NavLink className="btn-remove" onClick={() => { keepService.removeNote(note.id) }} to={`/KeepApp/`}>Delete</NavLink>
                
                <NavLink onClick={this.onSaveNote} to={`/KeepApp/`}>Go back</NavLink>
            </article>
        )
    }
}
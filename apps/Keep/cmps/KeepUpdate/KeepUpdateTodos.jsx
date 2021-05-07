const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'

export class KeepUpdateTodos extends React.Component {
    state = {
        note: null
    }
    
    inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()  // Got error
        let par = this.props.note.info.txt.map(line => {
            return line.str
        })
        this.props.note.info.txt = par.join('\n')
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
        let { txt } = note.info
        txt = txt.split('\n')
        let currNote = note
        currNote.info.txt = txt
        keepService.saveNoteTodos(currNote)
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
            <div class="edit-btns">
                {note.isPinned && <span>PINNED</span>}
                                
                <NavLink onClick={this.onSaveNote} to={`/KeepApp/`}>Go back</NavLink>
                </div>
            </article>
        )
    }
}
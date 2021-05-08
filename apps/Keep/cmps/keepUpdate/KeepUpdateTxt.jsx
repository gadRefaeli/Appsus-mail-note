const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'

export class KeepUpdateTxt extends React.Component {
    state = {
        note: null
    }

    inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()  // Got error
        this.props.note.info.txt = this.props.note.info.txt.join('\n')
        
        this.setState({ note: this.props.note })
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
                this.setState({ note })
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
                <div className="edit-btns">
                    <NavLink onClick={this.onSaveNote} to={`/KeepApp/`}><img src="./img/replay-01.png" width="40"></img></NavLink>
                </div>
            </article>
        )
    }
}
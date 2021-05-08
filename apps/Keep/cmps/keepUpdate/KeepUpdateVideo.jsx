const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
export class KeepUpdateVideo extends React.Component {
    state = {
        note: null
    }


    inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()
        this.setState({ note: this.props.note })
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
                this.setState({ note })
            })
    }

    render() {
        if (!this.state.note) return <div>Downloading...</div>
        const { note } = this.state
        const { url, title } = this.state.note.info
        return (
            <article className="update-note">
                <input className="input-add-note" type="text" ref={this.inputRef} name="url" value={url} placeholder="Enter image URL..." onChange={this.handleChange} />
                <input className="input-add-note" type="text" name="title" value={title} placeholder="Enter title..." onChange={this.handleChange} />
                <div class="edit-btns">

                    <NavLink onClick={this.onSaveNote} to={`/KeepApp/`}><img src="./img/replay-01.png" width="40"></img></NavLink>
                </div>
            </article>
        )
    }
}
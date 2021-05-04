import { keepService } from '../services/keep-service.js'

export class NoteTxt extends React.Component {
    state = {
        note: {
            isPinned: false,
            info: {
                txt: ''
            },
            style: null
        }
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
        if (!note.info.txt) return
        let currNote = this.state.note
        currNote['type'] = 'NoteTxt'
        keepService.saveNote(currNote)
        // .then((not) => {
        //     console.log(not)
        // })        
    }

    render() {
        const { txt } = this.state.note.info
        return (
            <section className="note-txt-card">
                <div className="note-txt-container">
                <input className="input-note-txt" type="text" name="info.txt" value={txt} placeholder="Enter Text..." onChange={this.handleChange} />
                <nav className="nav-note">
                    <button>A</button>
                    <button>Img</button>
                    <button>video</button>
                    <button>todo</button>
                </nav>
                </div>
                <button onClick={this.onSaveNote}>Save note</button>
            </section>
        )
    }
}
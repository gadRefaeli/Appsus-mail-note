const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { UpdateNoteTxt } from '../cmps/UpdateNote/UpdateNoteTxt.jsx'
import { UpdateNoteImg } from '../cmps/UpdateNote/UpdateNoteImg.jsx'
import { UpdateNoteVideo } from '../cmps/UpdateNote/UpdateNoteVideo.jsx'
import { UpdateNoteTodos } from '../cmps/UpdateNote/UpdateNoteTodos.jsx'

export class KeepUpdate extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        const id = this.props.match.params.KeepId
        if (!id) return
        keepService.getNoteById(id)
            .then(note => this.setState({note}))
    }

    render() {
        const { note } = this.state
        if (!note) return <div>Downloading...</div>
        console.log(note)
        const DynamicCmp = (props) => {
            switch (note.type) {
                case 'NoteTxt':
                    return <UpdateNoteTxt {...props} />
                case 'NoteImg':
                    return <UpdateNoteImg {...props} />
                case 'NoteVideo':
                    return <UpdateNoteVideo {...props} />
                case 'NoteTodos':
                    return <UpdateNoteTodos {...props} />
            }
        }

        return (
            <div className="cover-screen" onClick={() => {<NavLink to={`/KeepApp/`}/>}}>   
            <section className="update-modal">
                <h1>Edit</h1>
                <DynamicCmp note={this.state.note} />
                
            </section>
            </div>
        )
    }
}

// loadNotes={this.props.loadNotes}
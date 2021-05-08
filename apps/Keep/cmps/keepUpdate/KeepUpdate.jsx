const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { KeepUpdateTxt } from './KeepUpdateTxt.jsx'
import { KeepUpdateImg } from './KeepUpdateImg.jsx'
import { KeepUpdateVideo } from './KeepUpdateVideo.jsx'
import { KeepUpdateTodos } from './KeepUpdateTodos.jsx'

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
        const DynamicCmp = (props) => {
            switch (note.type) {
                case 'NoteTxt':
                    return <KeepUpdateTxt {...props} />
                case 'NoteImg':
                    return <KeepUpdateImg {...props} />
                case 'NoteVideo':
                    return <KeepUpdateVideo {...props} />
                case 'NoteTodos':
                    return <KeepUpdateTodos {...props} />
            }
        }

        return (
            <div className="cover-screen" onClick={() => {<NavLink to={`/KeepApp/`}/>}}>   
            <section className="update-modal">
                <h1>Edit</h1>
                <DynamicCmp note={this.state.note} loadNotes={this.props.loadNotes}/>
                
            </section>
            </div>
        )
    }
}

// loadNotes={this.props.loadNotes}
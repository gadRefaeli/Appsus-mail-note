const { NavLink } = ReactRouterDOM
import { keepService } from '../../services/keep-service.js'
import { KeepUpdateTxt } from '../cmps/KeepUpdate/KeepUpdateTxt.jsx'
import { KeepUpdateImg } from '../cmps/KeepUpdate/KeepUpdateImg.jsx'
import { KeepUpdateVideo } from '../cmps/KeepUpdate/KeepUpdateVideo.jsx'
import { KeepUpdateTodos } from '../cmps/KeepUpdate/KeepUpdateTodos.jsx'

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
                <DynamicCmp note={this.state.note} />
                
            </section>
            </div>
        )
    }
}

// loadNotes={this.props.loadNotes}
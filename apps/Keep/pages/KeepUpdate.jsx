const { NavLink } = ReactRouterDOM
import { UpdateNoteTxt } from '../cmps/UpdateNote/UpdateNoteTxt.jsx'
import { UpdateNoteImg } from '../cmps/UpdateNote/UpdateNoteImg.jsx'
import { UpdateNoteVideo } from '../cmps/UpdateNote/UpdateNoteVideo.jsx'
import { UpdateNoteTodos } from '../cmps/UpdateNote/UpdateNoteTodos.jsx'

export class KeepUpdate extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.KeepId
    }

    render() {

        // const DynamicCmp = (props) => {
        //     switch (this.props.note.type) {
        //         case 'NoteTxt':
        //             return <UpdateNoteTxt {...props} />
        //         case 'NoteImg':
        //             return <UpdateNoteImg {...props} />
        //         case 'NoteVideo':
        //             return <UpdateNoteVideo {...props} />
        //         case 'NoteTodos':
        //             return <UpdateNoteTodos {...props} />
        //     }
        // }

        return (
            <div className="cover-screen" onClick={() => {<NavLink to={`/KeepApp/`}/>}}>   
            <section className="update-modal">
                <h1>Edit</h1>
                {/* <DynamicCmp note={this.propsnote} loadNotes={this.props.loadNotes} /> */}
            </section>
            </div>
        )
    }
}
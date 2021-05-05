import { UpdateNoteTxt } from './UpdateNoteTxt.jsx'
import { UpdateNoteImg } from './UpdateNoteImg.jsx'
import { UpdateNoteVideo } from './UpdateNoteVideo.jsx'
import { UpdateNoteTodos } from './UpdateNoteTodos.jsx'

export function UpdateNote ({ note, loadNotes }) { 
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
        <DynamicCmp note={note} loadNotes={loadNotes}/>
    )
}
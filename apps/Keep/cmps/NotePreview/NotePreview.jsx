import { NotePreviewTxt } from './NotePreviewTxt.jsx'
import { NotePreviewImg } from './NotePreviewImg.jsx'
import { NotePreviewVideo } from './NotePreviewVideo.jsx'
import { NotePreviewTodos } from './NotePreviewTodos.jsx'

export function NotePreview({ note, loadNotes, setUpdateMode }) { 
    const DynamicCmp = (props) => {
        switch (note.type) {
           case 'NoteTxt':
                return <NotePreviewTxt {...props} />
            case 'NoteImg':
                return <NotePreviewImg {...props} />
            case 'NoteVideo':
                return <NotePreviewVideo {...props} />
            case 'NoteTodos':
                return <NotePreviewTodos {...props} />
        }
    }
    return (
        <DynamicCmp note={note} loadNotes={loadNotes} setUpdateMode={setUpdateMode}/>
    )
}
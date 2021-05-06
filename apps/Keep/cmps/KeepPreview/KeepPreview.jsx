import { KeepPreviewTxt } from './KeepPreviewTxt.jsx'
import { KeepPreviewImg } from './KeepPreviewImg.jsx'
import { KeepPreviewVideo } from './KeepPreviewVideo.jsx'
import { KeepPreviewTodos } from './KeepPreviewTodos.jsx'

export function KeepPreview({ note, loadNotes, setUpdateMode }) { 
    const DynamicCmp = (props) => {
        switch (note.type) {
           case 'NoteTxt':
                return <KeepPreviewTxt {...props} />
            case 'NoteImg':
                return <KeepPreviewImg {...props} />
            case 'NoteVideo':
                return <KeepPreviewVideo {...props} />
            case 'NoteTodos':
                return <KeepPreviewTodos {...props} />
        }
    }
    return (
        <DynamicCmp note={note} loadNotes={loadNotes} setUpdateMode={setUpdateMode}/>
    )
}
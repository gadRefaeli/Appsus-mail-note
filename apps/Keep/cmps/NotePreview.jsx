import { NotePreviewTxt } from './NotePreviewTxt.jsx'
import { NotePreviewImg } from './NotePreviewImg.jsx'

export function NotePreview({ note, loadNotes }) { 
    const DynamicCmp = (props) => {
        switch (note.type) {
           case 'NoteTxt':
                return <NotePreviewTxt {...props} />
            case 'NoteImg':
                return <NotePreviewImg {...props} />
        }
    }
    return (
        <DynamicCmp note={note} loadNotes={loadNotes}/>
    )
}
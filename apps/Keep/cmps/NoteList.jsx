import { NotePreview } from './NotePreview.jsx'
import { NotePreviewImg } from './NotePreviewImg.jsx'
export function NoteList({ notes }) {
    return (
    <div className="note-list">
      { notes.map(note => <NotePreview note={note} key={note.id} />)}
    </div>
  )
}




// import { NotePreview } from './NotePreview.jsx'
// import { NotePreviewImg } from './NotePreviewImg.jsx'
// export function NoteList({ notes }) {
    
//     // const DynamicCmp = (props) => {
//     //     switch (currNote) {
//     //         case 'noteTxt':
//     //             return <NotePreview {...props} />
//     //         case 'noteImg':
//     //             return <NotePreviewImg {...props} />
//     //         case 'WelcomeBack':
//     //             return <WelcomeBack {...props} />
//     //     }
//     // }
//     return (
//     <div className="note-list">
//       { notes.map((note) => { <NotePreview note={note} key={note.id} />
//         //   {var currNote = note.type}
//         //   <DynamicCmp note={note} key={note.id} />
//       })}
//     </div>
//   )
// }
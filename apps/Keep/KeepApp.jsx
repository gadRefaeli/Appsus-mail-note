const { Switch } = ReactRouterDOM

import { keepService } from './services/keep-service.js'

import { NoteList } from './cmps/NoteList.jsx'
import { NoteImg } from './cmps/NoteImg.jsx'
import { NoteTodos } from './cmps/NoteTodos.jsx'
import { NoteTxt } from './cmps/NoteTxt.jsx'
import { NoteVideo } from './cmps/NoteVideo.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        noteMode: 'noteTxt'
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query(false)
            .then((notes) => {
                this.setState({ notes })
            })
    }

    setNoteMode = (type) => {
        this.setState({noteMode: type})
    }

    render() {
        const { notes, noteMode } = this.state

        if (!notes || notes.length === 0) return <div>Loading...</div>

        return (
            <main className="keep-app">
                <h2>MissKeep</h2>
                <Switch>
                    {noteMode === 'noteTxt' && <NoteTxt loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'noteImg' && <NoteImg loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'noteTodos' && <NoteTodos loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'noteVideo' && <NoteVideo loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                </Switch>
                {/* {this.state.noteMode && <DynamicCmp loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>} */}

                <section>
                    <NoteList notes={notes} />
                </section>
            </main>
        )
    }
}

{/* (type) => {
                    console.log(type, this.state.noteMode)
                    this.setState({noteMode})
                } */}
{/* this.setState({noteMode: type}) */ }
{/* this.setNoteMode */ }
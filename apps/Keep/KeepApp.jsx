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
        noteMode: 'NoteTxt'
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query()
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
                    {noteMode === 'NoteTxt' && <NoteTxt loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteImg' && <NoteImg loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteTodos' && <NoteTodos loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteVideo' && <NoteVideo loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                </Switch>
                

                <section>
                    <NoteList notes={notes} loadNotes={this.loadNotes}/>
                </section>
            </main>
        )
    }
}

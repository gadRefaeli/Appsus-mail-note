const { Route, Switch } = ReactRouterDOM

import { keepService } from './services/keep-service.js'

import { NoteList } from './cmps/NoteList.jsx'
import { AddNoteImg } from './cmps/AddNote/AddNoteImg.jsx'
import { AddNoteTodos } from './cmps/AddNote/AddNoteTodos.jsx'
import { AddNoteTxt } from './cmps/AddNote/AddNoteTxt.jsx'
import { AddNoteVideo } from './cmps/AddNote/AddNoteVideo.jsx'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        noteMode: 'NoteTxt',
        updateMode: false
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

    setUpdateMode = (note) => {
        this.setState({updateMode: note})
    }

    render() {
        const { notes, noteMode } = this.state

        if (!notes || notes.length === 0) return <div>Loading...</div>

        return (
            <main className="keep-app">
                <h2>MissKeep</h2>
                <Switch>
                    {noteMode === 'NoteTxt' && <AddNoteTxt loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteImg' && <AddNoteImg loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteTodos' && <AddNoteTodos loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                    {noteMode === 'NoteVideo' && <AddNoteVideo loadNotes={this.loadNotes} setNoteMode={this.setNoteMode}/>}
                </Switch>
                
                <section>
                    <NoteList notes={notes} loadNotes={this.loadNotes} setUpdateMode={this.setUpdateMode}/>
                </section>
            
                <Route component={KeepUpdate} path="/KeepApp/:KeepId" />

            
            </main>
        )
    }
}

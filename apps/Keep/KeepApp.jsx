const { Route, Switch } = ReactRouterDOM

import { keepService } from './services/keep-service.js'

import { NoteList } from './cmps/NoteList.jsx'
import { AddNoteImg } from './cmps/AddNote/AddNoteImg.jsx'
import { AddNoteTodos } from './cmps/AddNote/AddNoteTodos.jsx'
import { AddNoteTxt } from './cmps/AddNote/AddNoteTxt.jsx'
import { AddNoteVideo } from './cmps/AddNote/AddNoteVideo.jsx'
import { KeepUpdate } from '../../pages/KeepUpdate.jsx'
import { KeepFilter } from '../../pages/KeepFilter.jsx'

export class KeepApp extends React.Component {
    state = {
        pinnedNotes: null,
        unPinnedNotes: null,
        noteMode: 'NoteTxt'
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query(true)
            .then((pinnedNotes) => {
                this.setState({ pinnedNotes })
            })
        keepService.query(false)
            .then((unPinnedNotes) => {
                this.setState({ unPinnedNotes })
            })
    }

    setNoteMode = (type) => {
        this.setState({ noteMode: type })
    }

    // setUpdateMode = (note) => {
    //     this.setState({updateMode: note})
    // }

    render() {
        const { pinnedNotes, unPinnedNotes, noteMode } = this.state

        if (!pinnedNotes || !unPinnedNotes || pinnedNotes.length === 0 && unPinnedNotes.length === 0) return <div>Loading...</div>

        return (
            <main className="keep-app">
                <h2>MissKeep</h2>
                <Switch>
                    {noteMode === 'NoteTxt' && <AddNoteTxt loadNotes={this.loadNotes} setNoteMode={this.setNoteMode} />}
                    {noteMode === 'NoteImg' && <AddNoteImg loadNotes={this.loadNotes} setNoteMode={this.setNoteMode} />}
                    {noteMode === 'NoteTodos' && <AddNoteTodos loadNotes={this.loadNotes} setNoteMode={this.setNoteMode} />}
                    {noteMode === 'NoteVideo' && <AddNoteVideo loadNotes={this.loadNotes} setNoteMode={this.setNoteMode} />}
                </Switch>

                {/* <KeepFilter/> */}

                <section>
                    {pinnedNotes.length > 0 && <h5>Pinned Notes</h5>}
                    <NoteList notes={pinnedNotes} loadNotes={this.loadNotes} />
                    {pinnedNotes.length > 0 && <h5>Other Notes</h5>}
                    <NoteList notes={unPinnedNotes} loadNotes={this.loadNotes} />
                </section>

                <Route component={KeepUpdate} path="/KeepApp/:KeepId" />


            </main>
        )
    }
}
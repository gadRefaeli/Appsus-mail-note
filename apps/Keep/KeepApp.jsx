const { Route, Switch } = ReactRouterDOM

import { keepService } from './services/keep-service.js'

import { KeepList } from './cmps/KeepList.jsx'
import { KeepAddImg } from './cmps/KeepAdd/KeepAddImg.jsx'
import { KeepAddTodos } from './cmps/KeepAdd/KeepAddTodos.jsx'
import { KeepAddTxt } from './cmps/KeepAdd/KeepAddTxt.jsx'
import { KeepAddVideo } from './cmps/KeepAdd/KeepAddVideo.jsx'
import { KeepUpdate } from './cmps/keepUpdate/KeepUpdate.jsx'
import { KeepFilter } from './cmps/KeepFilter.jsx'

export class KeepApp extends React.Component {
    state = {
        pinnedNotes: null,
        unPinnedNotes: null,
        noteMode: 'NoteTxt',
        filter: ''
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query(true, this.state.filter)
            .then((pinnedNotes) => {
                this.setState({ pinnedNotes })
            })
        keepService.query(false, this.state.filter)
            .then((unPinnedNotes) => {
                this.setState({ unPinnedNotes })
            })
    }

    onSetFilter = (value) => {
        this.setState({ filter: value }, this.loadNotes)
    }

    onSetNoteMode = (type) => {
        this.setState({ noteMode: type })
    }

    // setUpdateMode = (note) => {
    //     this.setState({updateMode: note})
    // }

    render() {
        const { pinnedNotes, unPinnedNotes, noteMode } = this.state
        if (!pinnedNotes || !unPinnedNotes) return <div>Loading...</div>

        return (
            <main className="keep-app">
                <Switch>
                    {noteMode === 'NoteTxt' && <KeepAddTxt loadNotes={this.loadNotes} setNoteMode={this.onSetNoteMode} />}
                    {noteMode === 'NoteImg' && <KeepAddImg loadNotes={this.loadNotes} setNoteMode={this.onSetNoteMode} />}
                    {noteMode === 'NoteTodos' && <KeepAddTodos loadNotes={this.loadNotes} setNoteMode={this.onSetNoteMode} />}
                    {noteMode === 'NoteVideo' && <KeepAddVideo loadNotes={this.loadNotes} setNoteMode={this.onSetNoteMode} />}
                </Switch>
<div className="keep-notes-contaner"> 
                <KeepFilter onSetFilter={this.onSetFilter} />

                <section>
                    {pinnedNotes.length > 0 && <h5>Pinned Notes</h5>}
                    <KeepList notes={pinnedNotes} loadNotes={this.loadNotes} />
                    {pinnedNotes.length > 0 && <h5>Other Notes</h5>}
                    <KeepList notes={unPinnedNotes} loadNotes={this.loadNotes} />
                </section>

                <Route component={KeepUpdate} path="/KeepApp/:KeepId" />
                </div>

            </main>
        )
    }
}
const { Switch } = ReactRouterDOM

import { NoteImg } from './cmps/NoteImg.jsx'
import { NoteTodos } from './cmps/NoteTodos.jsx'
import { NoteTxt } from './cmps/NoteTxt.jsx'
import { NoteVideo } from './cmps/NoteVideo.jsx'

export class KeepApp extends React.Component {
  state = {
      noteMode: 'NoteTxt'
  }
  
    render() {
      return (
          <section className="keep-app">
              <h2>MissKeep</h2>
            <Switch>
                {this.state.noteMode === 'NoteTxt' && <NoteTxt/>}
                {this.state.noteMode === 'NoteImg' && <NoteImg/>}
                <NoteTodos/>
                <NoteVideo/>
            </Switch>
          </section>
      )
  }
}
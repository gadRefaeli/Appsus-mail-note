export class KeepFilter extends React.Component {
    state = {
        search: ''
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState(({search: value }), () => {
          this.props.onSetFilter(this.state.search)
        })
      }

    render() {
        const { search } = this.state
        return (
            <div>
                <label htmlFor="input-search">Search</label>
                <input type="text" className="input-search" id="input-search" value={search} onChange={this.handleChange} />
            </div>
        )
    }
}
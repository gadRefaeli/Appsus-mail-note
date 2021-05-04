export class MailFilter extends React.Component {

  state = {
    filterBy: {
      search: '',
      read: false,
      unread: false,
    }
  }


  handleChange = (ev) => {
    const field = ev.target.name
    const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    this.setState(({ filterBy }) => ({
      filterBy: { ...filterBy, [field]: value }
    }), () => {
      this.props.onSetFilter(this.state.filterBy)
    })
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filterBy)
  }

  render() {
    const { search, read, unread } = this.state.filterBy
    return (
      <form className="mail-filter" onSubmit={this.onFilter}>
        <label htmlFor="bySearch">Search</label>
        <input type="text" id="bySearch" ref={this.inputRef} name="search" value={search} onChange={this.handleChange} />

        <label htmlFor="minSpeed">Read Mails</label>
        <input type="select" id="read" name="read" value="read" onChange={this.handleChange} />
        <label htmlFor="minSpeed">Unread Mails</label>
        <input type="select" id="unread" name="unread" value="unread" onChange={this.handleChange} />
      </form>
    )
  }
}
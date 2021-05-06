
export class MailSearch extends React.Component {


  state = {
    filterBy: {
      search: '',
    
    },
  }

  handleChange = (ev) => {
    this.setState(({ filterBy }) => ({
      filterBy: { ...filterBy, ['star']: false}
    }))
    const field = ev.target.name
    let value = ev.target.value;
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
    const { search} = this.state.filterBy
    return (

      <form className="search-div" onSubmit={this.onFilter}>
          
          <label htmlFor="bySearch"></label>
          <input type="text" id="bySearch"  name="search" value={search} placeholder="Search" onChange={this.handleChange} />
    
      </form>
    )
  }
}
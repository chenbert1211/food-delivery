import React from 'react'
import {connect} from 'react-redux'
import {createCategory, getSingleCategory} from '../../store/category'

class AddCat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit() {
    await this.props.createCategory({
      resturantId: this.props.resturantId,
      name: this.state.name
    })
    // await this.props.getSingleCategory(this.props.newCat.id)
    this.props.AddToCat()
    this.props.closeForm()
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <input onChange={this.handleChange} name="name" type="text" />
        </div>

        <div>
          <button onClick={this.handleSubmit}>Add Header</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    newCat: state.category
  }
}

const mapDispatch = dispatch => ({
  createCategory: rec => dispatch(createCategory(rec)),
  getSingleCategory: id => dispatch(getSingleCategory(id))
})

export default connect(mapState, mapDispatch)(AddCat)

import React from 'react'
import {connect} from 'react-redux'
import {createCategory} from '../../store/category'

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

  handleSubmit() {
    this.props.createCategory({
      resturantId: this.props.resturantId,
      name: this.state.name
    })
    this.props.AddToCat({name: this.state.name})
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
          <button onClick={this.handleSubmit}>Add Cart</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createCategory: rec => dispatch(createCategory(rec))
})

export default connect(mapState, mapDispatch)(AddCat)

import React from 'react'
import {connect} from 'react-redux'
import {createDish} from '../../store/dish'

class AddDish extends React.Component {
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
    this.props.createDish({categoryId: this.props.catId, name: this.state.name})
    // this.props.AddToCat({name: this.state.name})
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
          <button onClick={this.handleSubmit}>Add A DISH</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createDish: rec => dispatch(createDish(rec))
})

export default connect(mapState, mapDispatch)(AddDish)

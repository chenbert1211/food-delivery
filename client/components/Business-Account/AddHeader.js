import React from 'react'
import {connect} from 'react-redux'
import {createHeader} from '../../store/header'

class AddHeader extends React.Component {
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
    this.props.createHeader({dishId: this.props.dishId, name: this.state.name})
    // this.props.AddToCat({name: this.state.name})
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
          <button onClick={this.handleSubmit}>Add A HEADERER</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createHeader: rec => dispatch(createHeader(rec))
})

export default connect(mapState, mapDispatch)(AddHeader)

import React from 'react'
import {connect} from 'react-redux'
import {createAddOns} from '../../store/addOns'

class AddAddOns extends React.Component {
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
    this.props.createAddOns({
      headerId: this.props.headerId,
      name: this.state.name
    })
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
          <button onClick={this.handleSubmit}>Add A ADDONS!</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createAddOns: rec => dispatch(createAddOns(rec))
})

export default connect(mapState, mapDispatch)(AddAddOns)

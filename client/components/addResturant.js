import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class addResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      description: null,
      img: null,
      address: null,
      state: null,
      city: null,
      zip: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser({...this.state})
  }

  componentDidMount() {}

  render() {
    const {firstName, lastName, imageUrl, phoneNumber, email} = this.state
    console.log(this.state)
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h1>Resturant Information</h1>
              <div>
                <label>
                  First Name
                  <input
                    placeholder="First Name"
                    onChange={this.handleChange}
                    name="firstName"
                    value={firstName}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  Last Name
                  <input
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    name="lastName"
                    value={lastName}
                  />
                </label>
              </div>

              <br />

              <div>
                <label>
                  Image
                  <input
                    placeholder="Profile Picture"
                    onChange={this.handleChange}
                    name="imageUrl"
                    value={imageUrl}
                  />
                </label>
              </div>

              <br />

              <div>
                <label>
                  Cell Number
                  <input
                    placeholder="Cell Number"
                    onChange={this.handleChange}
                    name="phoneNumber"
                    value={phoneNumber}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  Email
                  <input
                    placeholder="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                  />
                </label>
              </div>
              <br />
              <div>
                <input type="submit" />
              </div>
              <div>
                <Link to="/account">
                  <button>Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    resturant: state.resturant
  }
}

const mapDispatch = dispatch => ({
  // updateUser: (auth) => dispatch(updateUser(auth)),
})

export default connect(mapState, mapDispatch)(addResturant)

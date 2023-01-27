import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createResturant} from '../../store/resturant'

class addResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      businessAccId: this.props.id,
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
    this.props.createResturant({...this.state})
  }

  componentDidMount() {}

  render() {
    const {name, description, img, address, state, city, zip} = this.state
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h1>Resturant Information</h1>
              <div>
                <label>
                  Business Name
                  <input
                    onChange={this.handleChange}
                    name="name"
                    value={name}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  Description
                  <input
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    name="description"
                    value={description}
                  />
                </label>
              </div>

              <br />

              <div>
                <label>
                  Business Image
                  <input
                    placeholder="Profile Picture"
                    onChange={this.handleChange}
                    name="img"
                    value={img}
                  />
                </label>
              </div>

              <br />

              <div>
                <label>
                  Address
                  <input
                    placeholder="Cell Number"
                    onChange={this.handleChange}
                    name="address"
                    value={address}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  State
                  <input
                    placeholder="Cell Number"
                    onChange={this.handleChange}
                    name="state"
                    value={state}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  City
                  <input
                    placeholder="Cell Number"
                    onChange={this.handleChange}
                    name="city"
                    value={city}
                  />
                </label>
              </div>
              <br />

              <div>
                <label>
                  Zipcode
                  <input
                    placeholder="Cell Number"
                    onChange={this.handleChange}
                    name="zip"
                    value={zip}
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
    id: state.business.id,
    resturant: state.resturant
  }
}

const mapDispatch = dispatch => ({
  createResturant: rec => dispatch(createResturant(rec))
})

export default connect(mapState, mapDispatch)(addResturant)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class MyResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>My Resturants</h1>
        <button>Add Resturant</button>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(MyResturant)

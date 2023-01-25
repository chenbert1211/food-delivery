import React from 'react'
import {connect} from 'react-redux'
import {getResturant} from '../store/resturant'
import {Link} from 'react-router-dom'

class Resturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getResturant()
  }

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    resturant: state.resturant
  }
}

const mapDispatch = dispatch => ({
  getResturant: () => dispatch(getResturant())
})

export default connect(mapState, mapDispatch)(Resturant)

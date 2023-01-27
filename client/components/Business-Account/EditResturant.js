import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleResturant} from '../../store/resturant'

class EditResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: []
    }
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    let data = await this.props.getSingleResturant(id)
    this.setState({
      resturant: data.resturant
    })
  }

  render() {
    let {resturant} = this.state
    return (
      <div>
        <h1>Edit My Resturants</h1>
        <h1>{resturant.name}</h1>
        <button>ADD CATEGORY</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    resturant: state.resturant,
    id: state.business.id
  }
}

const mapDispatch = dispatch => ({
  getSingleResturant: id => dispatch(getSingleResturant(id))
})

export default connect(mapState, mapDispatch)(EditResturant)

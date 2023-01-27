import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyResturant} from '../../store/resturant'

class MyResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: []
    }
  }

  async componentDidMount() {
    let data = await this.props.getMyResturant(this.props.id)
    this.setState({
      resturant: data.resturant
    })
  }

  render() {
    let {resturant} = this.state
    return (
      <div>
        <h1>My Resturants</h1>
        <Link to="/addResturant">
          <button>Add Resturant</button>
        </Link>

        {resturant
          ? resturant.map((rest, ind) => {
              return (
                <Link to={`/edit-resturant/${rest.id}`}>
                  <h1 key={ind}>{rest.name}</h1>
                </Link>
              )
            })
          : ''}
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
  getMyResturant: id => dispatch(getMyResturant(id))
})

export default connect(mapState, mapDispatch)(MyResturant)

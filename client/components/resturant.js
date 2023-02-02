import React from 'react'
import {connect} from 'react-redux'
import {getResturant, getSingleResturant} from '../store/resturant'
import {Link} from 'react-router-dom'

class Resturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturants: []
    }
  }

  async componentDidMount() {
    let {resturant} = await this.props.getResturant()
    this.setState({
      resturants: resturant
    })
  }

  render() {
    let {resturants, resturant, selected} = this.state
    return (
      <div className="resturantDiv">
        {resturants.map(rest => (
          <Link to={`/resturant/${rest.id}`}>
            <div className="resturantBox">
              <img
                className="resturantImg"
                src="http://riviera-buzz.com/wp-content/uploads/2016/05/terrasse-interior-1200.jpg"
              />
              <p>{rest.name}</p>
            </div>
          </Link>
        ))}
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
  getSingleResturant: id => dispatch(getSingleResturant(id)),
  getResturant: () => dispatch(getResturant())
})

export default connect(mapState, mapDispatch)(Resturant)

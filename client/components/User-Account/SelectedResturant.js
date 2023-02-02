import React from 'react'
import {connect} from 'react-redux'
import {getSingleResturant} from '../../store/resturant'
import {Link} from 'react-router-dom'

class SelectedResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: {}
    }
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    console.log(id)
    let data = await this.props.getSingleResturant(id)
    this.setState({
      resturant: data.resturant
    })
  }

  render() {
    let {resturant} = this.state
    return (
      <div className="resturantDiv">
        <div>
          <img
            className="myResturantImg"
            src="http://riviera-buzz.com/wp-content/uploads/2016/05/terrasse-interior-1200.jpg"
          />
          <h1 className="ResturantName">{resturant.name}</h1>
          <h3>
            {resturant.address}, {resturant.city}, {resturant.state}{' '}
            {resturant.zip}
          </h3>
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
  getSingleResturant: id => dispatch(getSingleResturant(id))
})

export default connect(mapState, mapDispatch)(SelectedResturant)

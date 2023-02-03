import React from 'react'
import {connect} from 'react-redux'
import {getSingleResturant} from '../../store/resturant'
import {updateCart, getCart} from '../../store/cart'
import {Link} from 'react-router-dom'

class SelectedResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: {},
      loading: false
    }
    this.addtoCart = this.addtoCart.bind(this)
  }

  async addtoCart(event) {
    let dishId = event.target.id
    await this.props.updateCart({dishId: dishId, cartId: this.props.cartId})
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    let data = await this.props.getSingleResturant(id)
    await this.props.getCart(this.props.userId)
    this.setState({
      resturant: data.resturant,
      loading: true
    })
  }

  render() {
    let {resturant, loading} = this.state
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

        {loading
          ? resturant.categories.map(cat => (
              <div className="category">
                <h2 className="categoryHeader">{cat.name}</h2>

                <div className="dishBox">
                  {cat.dishes.map(b => (
                    <div className="dishes">
                      <img
                        onClick={this.addtoCart}
                        className="dishImg"
                        id={b.id}
                        src="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMDFkNzMzZDE2MDA3MzJiNWFjMDIyNDljMWZhN2ExNGEvODU5YmFmZjFkNzYwNDJhNDVlMzE5ZDFkZTgwYWVjN2EuanBlZw=="
                      />
                      <p id={b.id}>{b.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : ''}
      </div>
    )
  }
}

const mapState = state => {
  return {
    resturant: state.resturant,
    userId: state.user.id,
    cartId: state.cart.id
  }
}

const mapDispatch = dispatch => ({
  getSingleResturant: id => dispatch(getSingleResturant(id)),
  updateCart: rec => dispatch(updateCart(rec)),
  getCart: id => dispatch(getCart(id))
})

export default connect(mapState, mapDispatch)(SelectedResturant)

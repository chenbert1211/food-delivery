import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart} from '../../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
  }

  async componentDidMount() {
    await this.props.getCart(this.props.userId)
    this.setState({
      cart: this.props.cart
    })
  }

  render() {
    let {cart} = this.state
    console.log(cart)
    return (
      <div>
        {cart.map(items => (
          <div>
            <h1>{items.name}</h1>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.dishes,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  getCart: id => dispatch(getCart(id))
})

export default connect(mapState, mapDispatch)(Cart)

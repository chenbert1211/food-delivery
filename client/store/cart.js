import axios from 'axios'
import history from '../history'

const UPDATE_CART = 'UPDATE_CART'
const GET_CART = 'GET_CART'

const _UpdateCart = cart => ({type: UPDATE_CART, cart})
const _getCart = cart => ({
  type: GET_CART,
  cart
})

export const getCart = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/cart/${id}`)
    return dispatch(_getCart(data))
  }
}

export const updateCart = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/cart`, rec)
    dispatch(_UpdateCart(data))
  }
}

export default function(state = {cart: {}}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}

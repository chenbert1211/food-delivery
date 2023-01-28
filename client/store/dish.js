import axios from 'axios'
import history from '../history'

const CREATE_DISH = 'CREATE_DISH'
const GET_SINGLE_DISH = 'GET_SINGLE_DISH'

const _createDish = resturant => ({type: CREATE_DISH, resturant})
const _getSingleDish = resturant => ({
  type: GET_SINGLE_DISH,
  resturant
})

export const getSingleDish = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/dish/${id}`)
    return dispatch(_getSingleDish(data))
  }
}

export const createDish = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/dish`, rec)
    dispatch(_createDish(data))
  }
}

export default function(state = {category: {}}, action) {
  switch (action.type) {
    case GET_SINGLE_DISH:
      return action.resturant
    case CREATE_DISH:
      return action.resturant
    default:
      return state
  }
}

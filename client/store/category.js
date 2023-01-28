import axios from 'axios'
import history from '../history'

const CREATE_CATEGORY = 'CREATE_CATEGORY'
const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY'

const _createCategory = resturant => ({type: CREATE_CATEGORY, resturant})
const _getSingleCategory = resturant => ({
  type: GET_SINGLE_CATEGORY,
  resturant
})

export const getSingleCategory = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/category/${id}`)
    return dispatch(_getSingleCategory(data))
  }
}

export const createCategory = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/category`, rec)
    dispatch(_createCategory(data))
  }
}

export default function(state = {category: {}}, action) {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return action.resturant
    case CREATE_CATEGORY:
      return action.resturant
    default:
      return state
  }
}

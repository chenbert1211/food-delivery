import axios from 'axios'
import history from '../history'

const CREATE_ADDONS = 'CREATE_ADDONS'
const GET_SINGLE_ADDONS = 'GET_SINGLE_ADDONS'

const _createAddOns = resturant => ({type: CREATE_ADDONS, resturant})
const _getSingleAddOns = resturant => ({
  type: GET_SINGLE_ADDONS,
  resturant
})

export const getSingleAddOns = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/addOns/${id}`)
    return dispatch(_getSingleAddOns(data))
  }
}

export const createAddOns = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/addOns`, rec)
    dispatch(_createAddOns(data))
  }
}

export default function(state = {addOns: {}}, action) {
  switch (action.type) {
    case GET_SINGLE_ADDONS:
      return action.resturant
    case CREATE_ADDONS:
      return action.resturant
    default:
      return state
  }
}

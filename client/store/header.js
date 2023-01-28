import axios from 'axios'
import history from '../history'

const CREATE_HEADER = 'CREATE_HEADER'
const GET_SINGLE_HEADER = 'GET_SINGLE_HEADER'

const _createHeader = resturant => ({type: CREATE_HEADER, resturant})
const _getSingleHeader = resturant => ({
  type: GET_SINGLE_HEADER,
  resturant
})

export const getSingleHeader = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/header/${id}`)
    return dispatch(_getSingleHeader(data))
  }
}

export const createHeader = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/header`, rec)
    dispatch(_createHeader(data))
  }
}

export default function(state = {header: {}}, action) {
  switch (action.type) {
    case GET_SINGLE_HEADER:
      return action.resturant
    case CREATE_HEADER:
      return action.resturant
    default:
      return state
  }
}

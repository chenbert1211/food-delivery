import axios from 'axios'
import history from '../history'

const GET_RESTURANT = 'GET_RESTURANT'
const CREATE_RESTURANT = 'CREATE_RESTURANT'

const _getResturant = resturant => ({type: GET_RESTURANT, resturant})
const _createResturant = resturant => ({type: CREATE_RESTURANT, resturant})

export const getResturant = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/resturant')
    console.log(data)
    return dispatch(_getResturant(data))
  }
}

export const createResturant = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/resturant`, rec)
    dispatch(_createResturant(data))
  }
}

export default function(state = {resturant: []}, action) {
  switch (action.type) {
    case GET_RESTURANT:
      return action.resturant
    case CREATE_RESTURANT:
      return action.resturant
    default:
      return state
  }
}

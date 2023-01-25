import axios from 'axios'
import history from '../history'

const GET_RESTURANT = 'GET_RESTURANT'
const ADD_RESTURANT = 'ADD_RESTURANT'

const _getResturant = resturant => ({type: GET_RESTURANT, resturant})
const _addResturant = () => ({type: ADD_RESTURANT})

export const getResturant = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/resturant')
    console.log(data)
    return dispatch(_getResturant(data))
  }
}

export default function(state = {resturant: []}, action) {
  switch (action.type) {
    case GET_RESTURANT:
      return action.resturant
    case ADD_RESTURANT:
      return defaultUser
    default:
      return state
  }
}

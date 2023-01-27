import axios from 'axios'
import history from '../history'

const GET_RESTURANT = 'GET_RESTURANT'
const GET_MYRESTURANT = 'GET_MYRESTURANT'
const CREATE_RESTURANT = 'CREATE_RESTURANT'
const GET_SINGLE_RESTURANT = 'GET_SINGLE_RESTURANT'

const _getResturant = resturant => ({type: GET_RESTURANT, resturant})
const _getMyResturant = resturant => ({type: GET_MYRESTURANT, resturant})
const _createResturant = resturant => ({type: CREATE_RESTURANT, resturant})
const _getSingleResturant = resturant => ({
  type: GET_SINGLE_RESTURANT,
  resturant
})

export const getResturant = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/resturant')
    return dispatch(_getResturant(data))
  }
}

export const getSingleResturant = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/resturant/single/${id}`)
    return dispatch(_getSingleResturant(data))
  }
}

export const getMyResturant = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/resturant/${id}`)
    return dispatch(_getMyResturant(data))
  }
}

export const createResturant = rec => {
  return async dispatch => {
    const {data} = await axios.post(`/api/resturant`, rec)
    dispatch(_createResturant(data))
    history.push('/myResturant')
  }
}

export default function(state = {resturant: []}, action) {
  switch (action.type) {
    case GET_RESTURANT:
      return action.resturant
    case GET_MYRESTURANT:
      return action.resturant
    case GET_SINGLE_RESTURANT:
      return action.resturant
    case CREATE_RESTURANT:
      return action.resturant
    default:
      return state
  }
}

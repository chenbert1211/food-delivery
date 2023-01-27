import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BUSINESS = 'GET_BUSINESS'
const REMOVE_BUSINESS = 'REMOVE_BUSINESS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_BUSINESS, user})
const removeUser = () => ({type: REMOVE_BUSINESS})

/**
 * THUNK CREATORS
 */
export const mee = () => async dispatch => {
  try {
    const res = await axios.get('/auth/businessme')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const steve = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/myResturant')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/businesslogout')
    dispatch(removeUser())
    history.push('/businesslogin')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_BUSINESS:
      return action.user
    case REMOVE_BUSINESS:
      return defaultUser
    default:
      return state
  }
}

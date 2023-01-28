import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import business from './businessAcc'
import resturant from './resturant'
import category from './category'
import dish from './dish'
import addOns from './addOns'
import header from './header'

const reducer = combineReducers({
  user,
  resturant,
  business,
  category,
  dish,
  addOns,
  header
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

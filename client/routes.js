import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  MyResturant,
  Login,
  Signup,
  UserHome,
  addResturant,
  Resturant,
  BusinessLogin,
  BusinessSignup,
  EditResturant,
  SelectedResturant,
  Cart
} from './components'
import {me} from './store'
import {mee} from './store/businessAcc'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isBusiness} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/resturants" component={Resturant} />
        <Route path="/resturant/:id" component={SelectedResturant} />
        <Route path="/businessSignup" component={BusinessSignup} />
        <Route path="/businessLogin" component={BusinessLogin} />
        <Route path="/home" component={Resturant} />
        <Route path="/resturant/:id" component={SelectedResturant} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={Resturant} />
            <Route path="/resturant/:id" component={SelectedResturant} />
            <Route path="/my-cart" component={Cart} />
          </Switch>
        )}

        {isBusiness && (
          <Switch>
            <Route path="/myResturant" component={MyResturant} />
            <Route path="/addResturant" component={addResturant} />
            <Route path="/edit-resturant/:id" component={EditResturant} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isBusiness: !!state.business.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(mee())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

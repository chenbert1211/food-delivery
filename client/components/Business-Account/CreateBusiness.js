import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {steve} from '../../store/businessAcc'

/**
 * COMPONENT
 */
const CreateBusiness = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <h1> THIS IS THE CREAT BUSEINES</h1>

      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'businesslogin',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'businesssignup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(steve(email, password, formName))
    }
  }
}

export const BusinessLogin = connect(mapLogin, mapDispatch)(CreateBusiness)
export const BusinessSignup = connect(mapSignup, mapDispatch)(CreateBusiness)

/**
 * PROP TYPES
 */
CreateBusiness.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

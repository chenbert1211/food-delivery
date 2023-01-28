import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {logoutt} from '../store/businessAcc'
import Button from '@mui/material/Button'

const Navbar = ({handleClick, isLoggedIn, isBusiness}) => (
  <div>
    <nav className="NavBar">
      <img id="logo" src="/Logo.png" />
      {isLoggedIn || isBusiness ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="NavBar">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Create Account</Button>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isBusiness: !!state.business.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(logoutt())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

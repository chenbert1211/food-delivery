import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {logoutt} from '../store/businessAcc'
import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MyResturant from './Business-Account/MyResturant'
import Resturant from './resturant'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'

const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))

const Navbar = ({handleClick, isLoggedIn, isBusiness, cartQty}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchor, setAnchor] = React.useState(null)
  const open = Boolean(anchorEl)
  const open1 = Boolean(anchor)
  const Click = event => {
    setAnchorEl(event.currentTarget)
  }
  const Click1 = event => {
    setAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setAnchor(null)
  }
  let steve = 0

  console.log(!cartQty ? '' : cartQty.map(a => (steve += a.cartItem.quantity)))

  return (
    <div>
      <nav className="NavBar">
        <img id="logo" src="/Logo.png" />
        {isLoggedIn ? (
          <div>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={steve} color="secondary">
                <ShoppingCartIcon color="action" />
              </StyledBadge>
            </IconButton>
            <Button
              id="basic"
              aria-controls={open ? 'setting' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={Click}
            >
              <img
                className="setting-icon"
                src="https://icon-library.com/images/three-line-menu-icon/three-line-menu-icon-6.jpg"
              />{' '}
            </Button>
            <Menu
              id="basic"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic'
              }}
            >
              <Link to="/resturants">
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem onClick={(handleClose, handleClick)}>Logout</MenuItem>
            </Menu>
          </div>
        ) : isBusiness ? (
          <div>
            <Button
              id="basic"
              aria-controls={open1 ? 'setting' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              onClick={Click1}
            >
              <img
                className="setting-icon"
                src="https://icon-library.com/images/three-line-menu-icon/three-line-menu-icon-6.jpg"
              />{' '}
            </Button>
            <Menu
              id="basic"
              anchorEl={anchor}
              open={open1}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic'
              }}
            >
              <Link to="/myResturant">
                <MenuItem onClick={MyResturant}>My Resturant</MenuItem>
              </Link>
              <MenuItem onClick={(handleClose, handleClick)}>Logout</MenuItem>
            </Menu>
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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isBusiness: !!state.business.id,
    cartQty: state.cart.dishes
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

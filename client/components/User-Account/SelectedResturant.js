import React from 'react'
import {connect} from 'react-redux'
import {getSingleResturant} from '../../store/resturant'
import {updateCart, getCart} from '../../store/cart'
import {getSingleDish} from '../../store/dish'
import {Link} from 'react-router-dom'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import Fade from '@mui/material/Fade'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Box, styled} from '@mui/system'
import Button from '@mui/material/Button'

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const {open, className, ...other} = props
  return (
    <div
      className={clsx({'MuiBackdrop-open': open}, className)}
      ref={ref}
      {...other}
    />
  )
})

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool
}

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`

const style = theme => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  border: '2px solid currentColor',
  boxShadow: 24,
  padding: '16px 32px 24px 32px'
})

class SelectedResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: {},
      addDish: false,
      dishId: null,
      loading: false,
      focusDish: false
    }
    this.addtoCart = this.addtoCart.bind(this)
    this.addDish = this.addDish.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.addAddOns = this.addAddOns.bind(this)
  }

  async addDish(event) {
    let getDish = await this.props.getSingleDish(event.target.id)
    this.setState({
      addDish: true,
      dishId: event.target.id,
      focusDish: getDish.resturant
    })
  }

  async addAddOns(event) {
    console.log(event.target.id)
    await this.props.updateCart({
      dishId: this.state.dishId,
      cartId: this.props.cartId,
      addOnId: event.target.id
    })
  }

  async addtoCart() {
    console.log(this.state.dishId, this.props.cartId)
    await this.props.updateCart({
      dishId: this.state.dishId,
      cartId: this.props.cartId
    })
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    let data = await this.props.getSingleResturant(id)
    await this.props.getCart(this.props.userId)
    this.setState({
      resturant: data.resturant,
      loading: true
    })
  }

  closeForm() {
    this.setState({
      addDish: false,
      focusDish: false
    })
  }

  render() {
    let {resturant, loading, focusDish} = this.state
    return (
      <div className="resturantDiv">
        <div>
          <img
            className="myResturantImg"
            src="http://riviera-buzz.com/wp-content/uploads/2016/05/terrasse-interior-1200.jpg"
          />
          <h1 className="ResturantName">{resturant.name}</h1>
          <h3>
            {resturant.address}, {resturant.city}, {resturant.state}{' '}
            {resturant.zip}
          </h3>
        </div>

        {loading
          ? resturant.categories.map(cat => (
              <div className="category">
                <h2 className="categoryHeader">{cat.name}</h2>

                <div className="dishBox">
                  {cat.dishes.map(b => (
                    <div className="dishes">
                      <img
                        onClick={this.addDish}
                        className="dishImg"
                        id={b.id}
                        src="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMDFkNzMzZDE2MDA3MzJiNWFjMDIyNDljMWZhN2ExNGEvODU5YmFmZjFkNzYwNDJhNDVlMzE5ZDFkZTgwYWVjN2EuanBlZw=="
                      />
                      <p id={b.id}>{b.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : ''}

        {focusDish ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.addDish}
            onClose={this.closeForm}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
          >
            <Fade in={this.state.addDish} timeout={300}>
              <Box sx={style}>
                {focusDish.headers.map(head => (
                  <div>
                    <h2>{head.name}</h2>
                    {head.addOns.map(b => (
                      <div>
                        <h3 onClick={this.addAddOns} id={b.id}>
                          {b.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                ))}
                <Button onClick={this.addtoCart}>Add Dish</Button>
              </Box>
            </Fade>
          </Modal>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    resturant: state.resturant,
    userId: state.user.id,
    cartId: state.cart.id
  }
}

const mapDispatch = dispatch => ({
  getSingleResturant: id => dispatch(getSingleResturant(id)),
  updateCart: rec => dispatch(updateCart(rec)),
  getCart: id => dispatch(getCart(id)),
  getSingleDish: id => dispatch(getSingleDish(id))
})

export default connect(mapState, mapDispatch)(SelectedResturant)

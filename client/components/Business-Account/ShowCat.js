import React from 'react'
import {connect} from 'react-redux'
import AddDish from './AddDish'
import AddHeader from './AddHeader'
import {createCategory} from '../../store/category'
import AddAddOns from './AddAddOns'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import Fade from '@mui/material/Fade'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Box, styled} from '@mui/system'
import {getSingleHeader} from '../../store/header'
import {getSingleDish} from '../../store/dish'

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

const styleTwo = theme => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '70%',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  // border: '2px solid currentColor',
  boxShadow: 24,
  padding: '16px 32px 24px 32px'
})

class ShowCat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addDish: false,
      catId: null,

      dishId: null,
      addHeader: false,

      headerId: null,
      addAddOns: false,

      focusDish: {}
    }

    this.addDish = this.addDish.bind(this)
    this.addHeader = this.addHeader.bind(this)
    this.addAddOns = this.addAddOns.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  addDish() {
    this.setState({
      addDish: true,
      addHeader: false,
      addAddOns: false,
      catId: event.target.value
    })
  }

  async addHeader(event) {
    let getDish = await this.props.getSingleDish(event.target.id)
    this.setState({
      addHeader: true,
      addAddOns: false,
      addDish: false,
      dishId: event.target.id,
      focusDish: getDish.resturant
    })
  }

  addAddOns() {
    this.setState({
      addAddOns: true,
      addHeader: false,
      addDish: false,
      headerId: event.target.value
    })
  }

  closeForm() {
    this.setState({
      addAddOns: false,
      addHeader: false,
      addDish: false
    })
    this.props.AddToCat()
  }

  handleSubmit() {
    this.props.createCategory({
      resturantId: this.props.resturantId,
      name: this.state.name
    })
  }

  async componentDidMount() {}

  render() {
    let {addDish, addHeader, addAddOns, focusDish} = this.state
    return (
      <div>
        {this.props.categories.map(a => (
          <div className="category">
            <h2 className="categoryHeader">{a.name}</h2>
            <button onClick={this.addDish} value={a.id}>
              Add Dish
            </button>
            <div className="dishBox">
              {a.dishes.map(b => (
                <div id={b.id} onClick={this.addHeader} className="dishes">
                  <h3 id={b.id}>{b.name}</h3>

                  {b.headers.map(c => (
                    <div>
                      <h4>{c.name}</h4>
                      <button value={c.id} onClick={this.addAddOns}>
                        ADD ADDONSS!
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addDish}
          onClose={this.closeForm}
          closeAfterTransition
          slots={{backdrop: Backdrop}}
        >
          <Fade in={addDish} timeout={300}>
            <Box sx={style}>
              <AddDish closeForm={this.closeForm} catId={this.state.catId} />
            </Box>
          </Fade>
        </Modal>

        {addHeader ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={addHeader}
            onClose={this.closeForm}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
          >
            <Fade in={addHeader} timeout={300}>
              <Box sx={styleTwo}>
                <h1>{focusDish.name}</h1>
                {focusDish.headers.map(head => (
                  <div>
                    <h2>{head.name}</h2>
                    <button value={head.id} onClick={this.addAddOns}>
                      ADD ADDONSS!
                    </button>
                    {head.addOns.map(b => (
                      <div>
                        <h3>{b.name}</h3>
                      </div>
                    ))}
                  </div>
                ))}
                <AddHeader
                  closeForm={this.closeForm}
                  dishId={this.state.dishId}
                />
              </Box>
            </Fade>
          </Modal>
        ) : (
          ''
        )}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addAddOns}
          onClose={this.closeForm}
          closeAfterTransition
          slots={{backdrop: Backdrop}}
        >
          <Fade in={addAddOns} timeout={300}>
            <Box sx={style}>
              <AddAddOns headerId={this.state.headerId} />
            </Box>
          </Fade>
        </Modal>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createCategory: rec => dispatch(createCategory(rec)),
  getSingleHeader: id => dispatch(getSingleHeader(id)),
  getSingleDish: id => dispatch(getSingleDish(id))
})

export default connect(mapState, mapDispatch)(ShowCat)

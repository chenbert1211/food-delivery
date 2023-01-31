import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleResturant} from '../../store/resturant'
import AddCat from './AddCat'
import ShowCat from './ShowCat'
import {Button} from '@mui/material'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import Fade from '@mui/material/Fade'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Box, styled} from '@mui/system'

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

class EditResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: {},
      loading: true,
      add: false
    }

    this.addForm = this.addForm.bind(this)
    this.AddToCat = this.AddToCat.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  async AddToCat() {
    let {resturant} = await this.props.getSingleResturant(
      this.state.resturant.id
    )
    this.setState({
      resturant: resturant
    })
  }

  addForm() {
    this.setState({add: true})
  }

  closeForm() {
    this.setState({add: false})
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    let data = await this.props.getSingleResturant(id)
    this.setState({
      resturant: data.resturant,
      loading: false
    })
  }

  render() {
    let {resturant, add, loading} = this.state
    return (
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
        <Button onClick={this.addForm}>ADD CATEGORY</Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={add}
          onClose={this.closeForm}
          closeAfterTransition
          slots={{backdrop: Backdrop}}
        >
          <Fade in={add} timeout={300}>
            <Box sx={style}>
              <AddCat
                AddToCat={this.AddToCat}
                resturantId={this.props.resturant.id}
                closeForm={this.closeForm}
              />
            </Box>
          </Fade>
        </Modal>

        {loading == true ? (
          ''
        ) : (
          <ShowCat AddToCat={this.AddToCat} categories={resturant.categories} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    resturant: state.resturant,
    id: state.business.id
  }
}

const mapDispatch = dispatch => ({
  getSingleResturant: id => dispatch(getSingleResturant(id))
})

export default connect(mapState, mapDispatch)(EditResturant)

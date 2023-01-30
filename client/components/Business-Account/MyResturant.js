import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyResturant} from '../../store/resturant'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import {styled} from '@mui/material/styles'
import {Button} from '@mui/material'

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  backgroundImage:
    'url(http://riviera-buzz.com/wp-content/uploads/2016/05/terrasse-interior-1200.jpg)',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '200px',
  margin: '20px',
  color: theme.palette.text.secondary
}))

class MyResturant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resturant: []
    }
  }

  async componentDidMount() {
    let data = await this.props.getMyResturant(this.props.id)
    this.setState({
      resturant: data.resturant
    })
  }

  render() {
    let {resturant} = this.state
    return (
      <div>
        <div className="myResturant">
          <h1>My Resturants</h1>
          <Link to="/addResturant">
            <Button>Add Resturant</Button>
          </Link>
        </div>
        <div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            {resturant
              ? resturant.map((rest, ind) => {
                  return (
                    <Link to={`/edit-resturant/${rest.id}`}>
                      <Item key={ind}>{rest.name}</Item>
                    </Link>
                  )
                })
              : ''}
          </Stack>
        </div>
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
  getMyResturant: id => dispatch(getMyResturant(id))
})

export default connect(mapState, mapDispatch)(MyResturant)

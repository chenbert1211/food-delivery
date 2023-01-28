import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleResturant} from '../../store/resturant'
import AddCat from './AddCat'
import ShowCat from './ShowCat'

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
  }

  AddToCat(cat) {
    this.setState({
      resturant: {categories: [...this.state.resturant.categories, cat]}
    })
  }

  addForm() {
    this.setState({add: true})
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
        <h1>Edit My Resturants</h1>
        <h1>{resturant.name}</h1>
        <button onClick={this.addForm}>ADD CATEGORY</button>
        {add ? (
          <AddCat
            AddToCat={this.AddToCat}
            resturantId={this.props.resturant.id}
          />
        ) : (
          ''
        )}
        {loading == true ? '' : <ShowCat categories={resturant.categories} />}
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

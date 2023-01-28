import React from 'react'
import {connect} from 'react-redux'
import AddDish from './AddDish'
import {createCategory} from '../../store/category'

class ShowCat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addDish: false,
      catId: null
    }

    this.addDish = this.addDish.bind(this)
  }

  addDish() {
    this.setState({
      addDish: true,
      catId: event.target.value
    })
  }

  handleSubmit() {
    this.props.createCategory({
      resturantId: this.props.resturantId,
      name: this.state.name
    })
    this.props.AddToCat({name: this.state.name})
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.categories.map(a => (
          <div>
            <h2>{a.name}</h2>
            <div>
              {a.dishes.map(b => (
                <div>
                  <h3>{b.name}</h3>
                </div>
              ))}
            </div>
            <button onClick={this.addDish} value={a.id}>
              Add Dish
            </button>
          </div>
        ))}
        {this.state.addDish == false ? (
          ''
        ) : (
          <AddDish catId={this.state.catId} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => ({
  createCategory: rec => dispatch(createCategory(rec))
})

export default connect(mapState, mapDispatch)(ShowCat)

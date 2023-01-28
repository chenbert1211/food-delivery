import React from 'react'
import {connect} from 'react-redux'
import AddDish from './AddDish'
import AddHeader from './AddHeader'
import {createCategory} from '../../store/category'
import AddAddOns from './AddAddOns'

class ShowCat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addDish: false,
      catId: null,

      dishId: null,
      addHeader: false,

      headerId: null,
      addAddOns: false
    }

    this.addDish = this.addDish.bind(this)
    this.addHeader = this.addHeader.bind(this)
    this.addAddOns = this.addAddOns.bind(this)
  }

  addDish() {
    this.setState({
      addDish: true,
      catId: event.target.value
    })
  }

  addHeader() {
    this.setState({
      addHeader: true,
      dishId: event.target.value
    })
  }

  addAddOns() {
    this.setState({
      addAddOns: true,
      headerId: event.target.value
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
            <button onClick={this.addDish} value={a.id}>
              Add Dish
            </button>
            <div>
              {a.dishes.map(b => (
                <div>
                  <h3>{b.name}</h3>
                  <button value={b.id} onClick={this.addHeader}>
                    Add Header
                  </button>

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

        {this.state.addDish == false ? (
          ''
        ) : (
          <AddDish catId={this.state.catId} />
        )}
        {this.state.addHeader == false ? (
          ''
        ) : (
          <AddHeader dishId={this.state.dishId} />
        )}
        {this.state.addAddOns == false ? (
          ''
        ) : (
          <AddAddOns headerId={this.state.headerId} />
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

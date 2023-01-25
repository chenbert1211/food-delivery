const Sequelize = require('sequelize')
const db = require('../db')

const Dish = db.define('dish', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING
  },

  img: {
    type: Sequelize.STRING
  },

  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Dish

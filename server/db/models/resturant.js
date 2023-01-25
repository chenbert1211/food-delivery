const Sequelize = require('sequelize')
const db = require('../db')

const Resturant = db.define('resturant', {
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

  address: {
    type: Sequelize.STRING
  },

  state: {
    type: Sequelize.STRING
  },

  city: {
    type: Sequelize.STRING
  },

  zip: {
    type: Sequelize.INTEGER
  }
})

module.exports = Resturant

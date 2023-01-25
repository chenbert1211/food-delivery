const Sequelize = require('sequelize')
const db = require('../db')

const AddOns = db.define('addOns', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  cost: {
    type: Sequelize.INTEGER,
    degaultValue: false
  }
})

module.exports = AddOns

const Sequelize = require('sequelize')
const db = require('../db')

const Header = db.define('header', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  more: {
    type: Sequelize.BOOLEAN,
    degaultValue: false
  }
})

module.exports = Header

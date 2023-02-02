const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
})

module.exports = Cart

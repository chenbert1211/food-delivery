const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const BusinessAcc = db.define('businessAcc', {
  name: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = BusinessAcc
BusinessAcc.prototype.correctPassword = function(candidatePwd) {
  return (
    BusinessAcc.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

BusinessAcc.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

BusinessAcc.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = BusinessAcc.generateSalt()
    user.password = BusinessAcc.encryptPassword(user.password(), user.salt())
  }
}

BusinessAcc.beforeCreate(setSaltAndPassword)
BusinessAcc.beforeUpdate(setSaltAndPassword)
BusinessAcc.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

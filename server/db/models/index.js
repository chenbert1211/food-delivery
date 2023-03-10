const User = require('./user')
const Resturant = require('./resturant')
const Category = require('./category')
const Dish = require('./dish')
const Header = require('./header')
const AddOns = require('./addOns')
const BusinessAcc = require('./businessAcc')
const Cart = require('./cart')
const CartItem = require('./cartItem')

const BusinessRest = BusinessAcc.hasMany(Resturant)
const restCat = Resturant.hasMany(Category)
const catDis = Category.hasMany(Dish)
const disHea = Dish.hasMany(Header)
const deaOns = Header.hasMany(AddOns)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Dish, {through: {model: CartItem, unique: false}})
Dish.belongsToMany(Cart, {through: {model: CartItem, unique: false}})

// cartItems to addons???
// AddOns.belongsToMany(Cart, {through: CartItem})
// Cart.belongsToMany(AddOns, {through: CartItem})
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  BusinessRest,
  BusinessAcc,
  restCat,
  catDis,
  disHea,
  deaOns,
  User,
  Resturant,
  Category,
  Dish,
  Header,
  AddOns,
  Cart,
  CartItem
}

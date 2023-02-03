const router = require('express').Router()
const {Cart, Dish, CartItem} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await Cart.findOne({
      where: {userId: id}
      //   ,
      //   include: [{association: disHea, include: [{association: deaOns}]}]
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let cart = await CartItem.findOne({where: {cartId: req.body.cartId}})
    if (!cart) {
      CartItem.create({
        cartId: req.body.cartId,
        dishId: req.body.dishId,
        quantity: 1
      })
    } else {
      cart.quantity += 1
      cart.save()
    }
    let allCart = await CartItem.findAll({where: {cartId: req.body.cartId}})
    res.status(201).send(allCart)
  } catch (err) {
    next(err)
  }
})

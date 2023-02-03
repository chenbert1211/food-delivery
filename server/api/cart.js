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

router.put('/', async (req, res, next) => {
  try {
    // console.log(req.body)
    // const cart = await Cart.findByPk(req.body.cartId)
    // const dish = await Dish.findByPk(req.body.dishId)
    // cart.addDish(dish, {quantity: 3})
    let cart = CartItem.create({
      cartId: req.body.cartId,
      dishId: req.body.dishId,
      quantity: 1
    })

    res.status(201).send(cart)
  } catch (err) {
    next(err)
  }
})

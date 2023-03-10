const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/resturant', require('./resturant'))
router.use('/category', require('./category'))
router.use('/dish', require('./dish'))
router.use('/header', require('./header'))
router.use('/addOns', require('./addOns'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

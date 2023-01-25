const router = require('express').Router()
const {Resturant, restCat} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const resturant = await Resturant.findAll({
      include: [{association: restCat}]
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

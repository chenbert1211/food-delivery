const router = require('express').Router()
const {Category, catDis} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await Category.findOne({
      where: {id: id},
      include: [{association: catDis}]
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newResturant = await Category.create(req.body)
    res.status(201).send(newResturant)
  } catch (err) {
    next(err)
  }
})

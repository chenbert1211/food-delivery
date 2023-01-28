const router = require('express').Router()
const {AddOns} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await AddOns.findOne({
      where: {id: id}
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newResturant = await AddOns.create(req.body)
    res.status(201).send(newResturant)
  } catch (err) {
    next(err)
  }
})

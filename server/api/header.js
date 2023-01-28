const router = require('express').Router()
const {Header, deaOns} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await Header.findOne({
      where: {id: id},
      include: [{association: deaOns}]
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newResturant = await Header.create(req.body)
    res.status(201).send(newResturant)
  } catch (err) {
    next(err)
  }
})

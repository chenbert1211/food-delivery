const router = require('express').Router()
const {Resturant, restCat, catDis, disHea, deaOns} = require('../db/models')
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

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await Resturant.findAll({where: {businessAccId: id}})
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.get('/single/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    const resturant = await Resturant.findOne({
      where: {id: id},
      include: [
        {
          association: restCat,
          include: [{association: catDis, include: [{association: disHea}]}]
        }
      ]
    })
    res.json(resturant)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newResturant = await Resturant.create(req.body)
    res.status(201).send(newResturant)
  } catch (err) {
    next(err)
  }
})

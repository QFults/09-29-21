const router = require('express').Router()
const { Item, User } = require('../models')

// router.get('/items', (req, res) => {
//   Item.find({})
//     .then(items => res.json(items))
//     .catch(err => console.log(err))
// })

router.get('/items', async function (req, res) {
  const items = await Item.find({}).populate('user')
  res.json(items)
})

// router.post('/items', (req, res) => {
//   Item.create(req.body)
//     .then(item => res.json(item))
//     .catch(err => console.log(err))
// })

router.post('/items', async function (req, res) {
  const item = await Item.create(req.body)
  await User.findByIdAndUpdate(req.body.user, { $push: { items: item._id } })
  res.json(item)
})

router.put('/items/:id', async function (req, res) {
  await Item.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.sendStatus(200)
})

router.delete('/items/:id', async function (req, res) {
  await Item.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router

const router = require('express').Router()
const { User } = require('../models')

router.get('/users/:id', async function (req, res) {
  const user = await User.findById(req.params.id).populate('items')
  res.json(user)
})

router.post('/users', async function (req, res) {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/users/:id', async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.sendStatus(200)
})

router.delete('/users/:id', async function (req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router

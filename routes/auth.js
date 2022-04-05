const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Got auth')
})

module.exports = router
const express = require('express')
//const Tweets = require('./../database/models/tweet.model')
const api = require('./api')
const tweets = require('./tweets')

const router = express.Router()

router.use('/api', api)
//router.use('/tweets', tweets)

/*router.get('/', (req, res) => {
    res.redirect('/tweets')
})*/

module.exports = router
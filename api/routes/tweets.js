const express = require('express')
//const Tweet = require('./../database/models/tweet.model')
const { twittersList, createTweet, tweetNew, tweetDelete, tweetEdit, tweetUpdate } = require('./../controllers/tweet.controller')
const router = express.Router()

router.get('/', twittersList)

router.get('/new', tweetNew)

router.get('/edit/:tweetId', tweetEdit)

router.post('/', createTweet)

router.post('/update/:tweetId', tweetUpdate)

router.delete('/:tweetId', tweetDelete)

module.exports = router
const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require('../queries/tweet.queries')


exports.twittersList = async (req, res, next) => {
    try {
        console.log('get')
        const tweets = await getTweets()
        res.render('tweets/tweets', { tweets})
    } catch(e) {
        next(e)
    }
}

exports.tweetNew = (req, res) => {
    res.render('tweets/tweet-form', { tweet:{}})
}

exports.createTweet = async (req, res) => {
    try {
        const tweet = await createTweet(req.body)
        res.redirect("/tweets")
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.tweetDelete = async (req, res) => {
    try {
        const tweetId =req.params.tweetId
        console.log(tweetId)
        await deleteTweet(tweetId)
        const tweets = await getTweets()
        res.render("tweets/tweet-list", { tweets})
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.tweetEdit = async (req, res) => {
    try {
        const tweetId =req.params.tweetId
        const tweet = await getTweet(tweetId)
        res.render("tweets/tweet-form", { tweet })
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        res.status(400).render("tweets/tweet-form", { errors})
    }
}

exports.tweetUpdate = async (req, res) => {
    const tweetId =req.params.tweetId
    try {
        console.log(tweetId)
        //const tweet = await getTweet(tweetId)
        await updateTweet(tweetId, req.body) 
        res.redirect("/tweets")
    } catch(e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message)
        console.log(errors)
        const tweet = getTweet(tweetId)
        res.status(400).render("tweets/tweet-form", { errors, tweet})
    }
}
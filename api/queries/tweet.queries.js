const Tweets = require('./../database/models/tweet.model')

exports.getTweets = () => {
    return Tweets.find({}).exec()
}

exports.createTweet = (tweet) => {
    const newTweet = new Tweets(tweet)
    return newTweet.save()
}

exports.deleteTweet = (tweetId) => {
    return Tweets.find().findByIdAndDelete(tweetId)
}

exports.getTweet = (tweetId) => {
    console.log(tweetId)
    
    return Tweets.findOne({_id:tweetId}).exec()
}

exports.updateTweet = (tweetId, tweet) => {
  return Tweets.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
}
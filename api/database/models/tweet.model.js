const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
  content: { type: String, 
           minlength:[2, 'Le tweet est trop court'], 
           maxlength:[140, 'Le tweet est trop long'], 
           required: [true, 'Le message du tweet est obligatoire'] },
}, {
  timestamps: true
})

const Tweets = mongoose.model('tweets', tweetSchema);

module.exports = Tweets;


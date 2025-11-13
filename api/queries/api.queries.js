const Categorys = require('../database/models/category.model')
const Competences = require('../database/models/competence.model');
const Messages = require('../database/models/message.model');
const Users = require('../database/models/user.model')
const bcrypt = require('bcrypt');




exports.getCategorys = () => {
    return Categorys.find({}).exec()
}

exports.createCategory = (category) => {
    console.log(category)
    const newCategory = new Categorys(category)
    return newCategory.save()
}

exports.deleteCategory = (categoryId) => {
    return Categorys.find().findByIdAndDelete(categoryId)
}

exports.getCompetences = () => {
    return Competences.find({}).exec()
}

exports.createCompetence = (competence) => {
    const newCompetence = new Competences(competence)
    return newCompetence.save()
}

exports.createUser = async (newUser) => {
  const { email, nom, prenom, noment, password } = newUser;
  const user = new Users({
    email,
    nom,
    prenom,
    noment,
    password: await bcrypt.hash(password, 8),
  });
  return user.save()
}

exports.createMessage = async (message) => {
  const newMessage = new Messages(message)
  return newMessage.save()
}

exports.authUtilisateur = async (authUser) => {
  const { email } = authUser;
  console.log('email'+email)
  return Users.findOne({ email }).exec();
  
}

exports.getCurrentUser = async (decodedToken) => {
  return Users.findById(decodedToken)
        .select("-__v -password")
        .exec();
  
}

exports.deleteCompetence = (competenceId) => {
    return Competences.find().findByIdAndDelete(competenceId)
}

exports.getTweet = (tweetId) => {
    console.log(tweetId)
    
    return Tweets.findOne({_id:tweetId}).exec()
}

exports.updateTweet = (tweetId, tweet) => {
  return Tweets.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
}
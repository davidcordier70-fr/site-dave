const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MessageSchema = schema({
  noment: String,
  nom: String,
  prenom: String,
  titre: String,
  message:String,
}, {
  timestamps: true
})

const Messages = mongoose.model('messages', MessageSchema);

module.exports = Messages;


const mongoose = require('mongoose');
const schema = mongoose.Schema;


const UserSchema = schema({
  email : { type: String, unique: true },
  nom: String,
  prenom: String,
  noment: String,
  password: String,
}, {
  timestamps: true
})

const Users = mongoose.model('users', UserSchema);

module.exports = Users;


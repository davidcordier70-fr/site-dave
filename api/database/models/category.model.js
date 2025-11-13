const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = schema({
  libelle : String,
}, {
  timestamps: true
})

const Categorys = mongoose.model('categorys', CategorySchema);

module.exports = Categorys;


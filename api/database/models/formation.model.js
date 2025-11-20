const mongoose = require('mongoose');
const schema = mongoose.Schema;


const FormationSchema = schema({
  ecole: String,
  plateforme: String,
  title: String,
  montYearDeb: String,
  montYearFin: String

}, {
  timestamps: true
})

const Formations = mongoose.model('formations', FormationSchema);

module.exports = Formations;


const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ExperienceSchema = schema({
  titre: String,
  noment: String,
  typContrat: String,
  montYearDeb: String,
  montYearFin: String,
  lieu:String,
  missions:[String]

}, {
  timestamps: true
})

const Experiences = mongoose.model('experiences', ExperienceSchema);

module.exports = Experiences;


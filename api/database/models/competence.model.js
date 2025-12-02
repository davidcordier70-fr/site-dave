const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CompetenceSchema = schema({
        name : String,
        image: String,
        competences: [String],
        category_name: String,
        padding_image:String,
        gradient:String
             
   },
 {
  timestamps: true
})

const Competences = mongoose.model('competences', CompetenceSchema);

module.exports = Competences;


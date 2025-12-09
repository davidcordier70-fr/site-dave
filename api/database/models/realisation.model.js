const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RealisationsSchema = schema({
        name : String,
        image: String,
        libelle: String,
        technologie_back: String,
        technologie_front: String,
        url_site: String,
        description: String,
        type: String,
        base_de_donnees: String
             
   },
 {
  timestamps: true
})

const Realisations = mongoose.model('realisations', RealisationsSchema);

module.exports = Realisations;


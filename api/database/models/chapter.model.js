const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chapterSchema = schema({
  title: { type: String, required: [true, 'Le titre est obligatoire'] },
  nbrOfLesson: { type: Number, required: [true, 'Le nombre de lessons est obligatoire'] },
  index: Number,
  active: Boolean,
}, {
  timestamps: true
})

chapterSchema.pre('save', function(){
  return Chapters.countDocuments().exec().then( nbr => this.index = nbr + 1);
})

const Chapters = mongoose.model('chapters', chapterSchema);

module.exports = Chapters;
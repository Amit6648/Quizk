const mongoose  = require('mongoose');
// Replace your current model definition with:
const questionSchema = new mongoose.Schema({
    _id: String,
    topicId: String,
    text: String,
    options: [String],
    correctAnswer: String,
    difficulty: String,
    createdAt: Date
  }, { collection: 'questions' });
  
  // Create model PROPERLY (most common mistake)
module.exports = mongoose.model('Question', questionSchema);


const mongoose = require('mongoose');

// define the User model schema
const FeedbackSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  feedback: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

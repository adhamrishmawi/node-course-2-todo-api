var mongoose = require('mongoose');

// Create a mongoose model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, //this way we cannot put an empty string
    trim: true //will remove any leading or trailing white space
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
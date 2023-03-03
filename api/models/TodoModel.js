const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  todos: [
    {
      type: String,
      require: true,
    },
  ],
});

module.exports = mongoose.model('ToDo', todoSchema);

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 🔐 user link
});

module.exports = mongoose.model('Skill', skillSchema);


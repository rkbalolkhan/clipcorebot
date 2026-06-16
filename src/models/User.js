const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  totalDownloads: {
    type: Number,
    default: 0,
  },
  language: {
    type: String,
    default: 'en',
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);

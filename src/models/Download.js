const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['instagram', 'tiktok', 'facebook', 'twitter', 'youtube'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  errorMessage: {
    type: String,
  },
});

module.exports = mongoose.model('Download', downloadSchema);

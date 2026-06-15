const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
  },
  requestType: {
    type: String,
    enum: ['download', 'mp3_conversion', 'command'],
    required: true,
  },
  platform: {
    type: String,
    enum: ['instagram', 'tiktok', 'youtube', 'local', null],
    default: null,
  },
  url: {
    type: String,
  },
  command: {
    type: String,
    enum: ['/start', '/help', '/mp3', null],
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'success', 'failed'],
    default: 'pending',
  },
  errorMessage: {
    type: String,
  },
  processingTime: {
    type: Number, // milliseconds
  },
  fileSize: {
    type: Number, // bytes
  },
  fileType: {
    type: String, // mp4, mp3, etc
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
  },
});

// Index for querying requests by user and date
requestSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Request', requestSchema);

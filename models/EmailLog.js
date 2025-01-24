const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
    email: String,
    subject: String,
    content: String,
    status: String, // sent, failed, read, etc.
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailLog', emailLogSchema);

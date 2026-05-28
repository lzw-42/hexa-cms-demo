const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, default: '草稿' },
    summary: { type: String, default: '' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

module.exports = mongoose.model('Post', postSchema);

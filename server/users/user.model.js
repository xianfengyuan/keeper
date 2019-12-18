const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String },
    hash: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true }
    // createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
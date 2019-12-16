import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, required: true }
});

export default mongoose.model('User', userSchema);

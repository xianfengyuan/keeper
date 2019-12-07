import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let loginSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  established: {
    type: Date,
    required: false
  },
  comments: {
    type: String,
    required: false
  }
});

export default mongoose.model('Login', loginSchema);

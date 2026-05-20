import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  client_id: { type: String, required: true },
  lawyer_id: { type: String, required: true },
  case_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
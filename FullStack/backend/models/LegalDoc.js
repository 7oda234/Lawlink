const mongoose = require('mongoose');

const LegalDocSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  analysis: {
    summary: String,
    keyTerms: [String],
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'] }
  },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LegalDoc', LegalDocSchema);

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Resolution', 'Report', 'Plan', 'Form', 'Other'],
      default: 'Other',
      index: true,
    },
    fileUrl: {
      type: String,
      trim: true,
      default: '',
    },
    fileKey: {
      type: String,
      trim: true,
      default: '',
    },
    fileSize: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Draft', 'Filed', 'Approved', 'Archived'],
      default: 'Draft',
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

documentSchema.index({ title: 'text', type: 'text' });

const Document = mongoose.model('Document', documentSchema);

export default Document;

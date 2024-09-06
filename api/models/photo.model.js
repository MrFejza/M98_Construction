import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;

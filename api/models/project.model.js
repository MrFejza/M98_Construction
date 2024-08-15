import mongoose from 'mongoose';

// Define the schema for a project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  client: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  budget: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create and export the model
const Project = mongoose.model('Project', projectSchema);
export default Project;

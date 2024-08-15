import express from 'express';
import Project from '../models/project.model.js'; // Import the Mongoose model
import { createProject } from '../controllers/project.controller.js';
import upload from '../upload.js';
const router = express.Router();


// Route to handle project creation with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    // Create a new project
    const project = await createProject(req);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects); // Send the project data to the frontend
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
  }
})

export default router;

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


router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project); // Send the project data to the frontend
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, message: 'Error fetching project', error: error.message });
  }
});

// Route to update a specific project by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project fields
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.location = req.body.location || project.location;
    project.client = req.body.client || project.client;
    project.status = req.body.status || project.status;
    project.startDate = req.body.startDate || project.startDate;
    project.endDate = req.body.endDate || project.endDate;
    project.budget = req.body.budget || project.budget;

    // Handle file upload if there's a new image
    if (req.file) {
      project.image = req.file.path;
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Error updating project', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
import Project from '../models/project.model.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, location, client, status, startDate, endDate, budget } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; // Path to the uploaded images

    // Create a new project
    const newProject = new Project({
      title,
      description,
      location,
      client,
      status,
      startDate,
      endDate,
      budget,
      image: images
    });

    // Save the project to the database
    await newProject.save();
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error details:', error); // Add more detailed logging
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Start with the existing project data
    const updateData = { ...req.body };

    // Append new images to existing ones if new images are provided
    if (req.files && req.files.length > 0) {
      updateData.image = project.image.concat(req.files.map(file => file.path));
    }

    // Update the project in the database
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};



// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

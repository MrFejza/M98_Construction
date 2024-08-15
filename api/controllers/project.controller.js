import Project from '../models/project.model.js';

// Create a new project
export const createProject = async (req) => {
  try {
    const { title, description, location, client, status, startDate, endDate, budget } = req.body;
    const image = req.file ? req.file.path : null; // Path to the uploaded image

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
      image
    });

    // Save the project to the database
    await newProject.save();
    
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error; // Rethrow error to be caught by the route handler
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
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
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

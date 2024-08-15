import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "../Meta";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  console.log(projects[2])

  return (
    <>
      <Meta title="Projects - Construction Company" />
      <div className="container mx-auto px-10 py-8 ">
        <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={`http://localhost:3000/${project.image}`} alt={project.title ?? 'image'} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Client:</strong> {project.client}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Start Date:</strong> {project.startDate}</p>
              <p><strong>End Date:</strong> {project.endDate}</p>
              <p><strong>Budget:</strong> {project.budget}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;

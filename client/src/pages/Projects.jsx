import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "../Meta";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 9 cards per page

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        // Sort projects by startDate in descending order
        const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const editProject = (project) => {
    if (localStorage.getItem('isAuth') === 'true') {
      return (
        <Link to={`/edit/${project._id}`}>
          <button className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-primary-shallow transition-colors">
            Edit
          </button>
        </Link>
      );
    }
  };

  const deleteProject = async (project) => {
    if (localStorage.getItem('isAuth') === 'true') {
      const confirmDelete = window.confirm("Are you sure you want to delete this project?");
      if (confirmDelete) {
        try {
          await axios.delete(`/api/projects/${project._id}`);
          setProjects((prevProjects) => prevProjects.filter(p => p._id !== project._id));
          navigate('/projects');
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      }
    }
  };

  const showDeleteButton = (project) => {
    if (localStorage.getItem('isAuth') === 'true') {
      return (
        <button
          onClick={() => deleteProject(project)}
          className="bg-red-600 ml-10 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      );
    }
  };

  return (
    <>
      <Meta title="Projects - Construction Company" />
      <div className="container mx-auto px-10 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
  <div key={project._id} className="bg-white p-4 rounded-lg shadow-lg">
    <Link to={`/information/${project._id}`}>
      <img
        src={
          project.image && Array.isArray(project.image) && project.image.length > 0
            ? `http://localhost:3000/${project.image[0]}` // Access the first image
            : 'default-image-path.jpg' // Optional: Fallback if no image is available
        }
        alt={project.title ?? 'Project Image'}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <p>
        <strong>Location:</strong> {project.location}
      </p>
      <p>
        <strong>Client:</strong> {project.client}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>
        <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Budget:</strong>{' '}
        {new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(
          project.budget
        )}
      </p>
    </Link>
    {editProject(project)}
    {showDeleteButton(project)}
  </div>
))}

        </div>
        <div className="flex justify-center mt-8">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
          )}
          <span className="text-lg font-bold mx-2">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full ml-2"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;

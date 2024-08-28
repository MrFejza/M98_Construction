import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: '',
    description: '',
    location: '',
    client: '',
    status: '',
    startDate: '',
    endDate: '',
    budget: '',
    image: null,
  });
  const [newImage, setNewImage] = useState(null); // State for the new image

  useEffect(() => {
    axios.get(`/api/projects/${_id}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(err => console.log('Error fetching project:', err));
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]); // Update the new image state
    setProject(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to update this project?");
    if (!isConfirmed) {
      return;
    }

    try {
      const formData = new FormData();
      for (let key in project) {
        formData.append(key, project[key]);
      }

      await axios.put(`/api/projects/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-center text-primary-deep mb-8">Edit Project</h1>
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                rows="5"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={project.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
              />
            </div>

            {/* Client */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Client</label>
              <input
                type="text"
                name="client"
                value={project.client}
                onChange={handleChange}
                placeholder="Client"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
              />
            </div>

            {/* Status (Enumeration) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <select
                name="status"
                value={project.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                required
              >
                <option value="">Select Status</option>
                <option value="Perfunduar">Perfunduar</option>
                <option value="Duke u Ndertuar">Duke u Ndertuar</option>
                <option value="Fillojme se shpejti">Fillojme se shpejti</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={project.startDate ? project.startDate.split('T')[0] : ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={project.endDate ? project.endDate.split('T')[0] : ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
              />
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Budget</label>
              <input
                type="number"
                name="budget"
                value={project.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep mt-2"
              />
              {newImage ? (
                <img
                  src={URL.createObjectURL(newImage)}
                  className="w-full p-3 border rounded-md bg-gray-200 mt-2"
                  alt="Project"
                />
              ) : (
                project.image && typeof project.image === 'string' && (
                  <img
                    src={`http://localhost:3000/${project.image}`} // Update this URL to match your server's URL structure
                    className="w-full p-3 border rounded-md bg-gray-200 mt-2"
                    alt="Project"
                  />
                )
              )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="text-center">
              <button type="submit" className="bg-gray-500 hover:bg-gray-700 w-full text-white font-bold py-3 px-6 rounded-md transition-colors">
                Update Project
              </button>
              <Link to="/dashboard/projects" className="bg-gray-500 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors mt-2 inline-block">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;

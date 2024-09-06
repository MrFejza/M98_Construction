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
    image: [], // Updated from images to image
  });
  const [newImages, setNewImages] = useState([]); // State for new images
  // Fetch project data by ID
  useEffect(() => {
    axios
      .get(`/api/projects/${_id}`)
      .then((res) => {
        setProject({
          ...res.data,
          image: res.data.image || [], // Ensure image is always an array
        });
      })
      .catch((err) => console.log('Error fetching project:', err));
  }, [_id]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files); // Handle multiple files
  //   setNewImages((prevImages) => [...prevImages, ...files]); // Add new images to existing ones
  // };

// Handle file input changes
  const handleFileChange =(e)=>{

    //console.log("project-----",project);
    //console.log("image-----",e.target.files);

    setProject((prevState)=>{
      return{
        ...prevState,
        image:[e.target.files]
      }
    });

    const files = Array.from(e.target.files); 
    setNewImages([...files]);
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("project-----",project);
  
    try {
      const formData = new FormData();
      formData.append('title', project.title);
      formData.append('description', project.description);
      formData.append('location', project.location);
      formData.append('client', project.client);
      formData.append('status', project.status);
      formData.append('startDate', project.startDate);
      formData.append('endDate', project.endDate);
      formData.append('budget', project.budget);
      // formData.append('image',newImages);
      newImages.forEach((file) => {
        formData.append('image', file);
      })


      //console.log("result-----",newImages[0]);
      const config = {     
        headers: { 'Content-type': 'multipart/form-data' }
      }
      const result =  await axios.put(`/api/projects/${_id}`, formData,config);
      console.log("result-----",result);


    } catch (error) {
      console.error('Error updating project:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-center text-primary-deep mb-8">
          Edit Project
        </h1>
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Client
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Budget
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Images
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                multiple // Allow multiple file uploads
                className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep mt-2"
              />
              {/* Display selected or existing images */}
              <div className="mt-2">
                <div className="grid grid-cols-3 gap-4">
                {project.image.map((img, index) => (
                  <img
                    key={`existing-${index}`}
                    src={`http://localhost:3000/${img}`} // Corrected variable name
                    className="w-full h-auto rounded-md border border-gray-300"
                    alt={`Existing Project ${index}`}
                  />
                ))}
                {newImages.map((file, index) => (
                  <img
                    key={`new-${index}`}
                    src={URL.createObjectURL(file)} // Display the new images
                    className="w-full h-auto rounded-md border border-gray-300"
                    alt={`New Project ${index}`}
                  />
                ))}
                </div>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-700 w-full text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Update Project
              </button>
              <Link
                to="/dashboard/projects"
                className="bg-gray-500 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors mt-2 inline-block"
              >
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

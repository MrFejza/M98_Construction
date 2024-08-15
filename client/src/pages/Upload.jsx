import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Meta from "../Meta";
import { toast } from "react-toastify";

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [image, setImage] = useState(null);
 

  // Handler for project creation
  const handleProjectCreation = async () => {
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('client', client);
    formData.append('status', status);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('budget', budget);

    if (image) formData.append('image', image);
   

    try {
      const response = await axios.post('/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      toast.success(response.data.message || 'Project created successfully');
      navigate('/dashboard/projects'); // Redirect after successful creation
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    handleProjectCreation();
  };

  return (
    <>
      <Meta title={`${title || "New Project"} - Construction Company`} />
      <div className="flex justify-center items-center bg-gray-100 min-h-screen ml-12 sm:ml-14 py-10">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-4xl font-bold text-center text-primary-deep mb-8">Add New Project</h1>
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-xl mx-auto">
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter project location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Client</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <input
                  type="text"
                  placeholder="Enter project status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Budget</label>
                <input
                  type="text"
                  placeholder="Enter project budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep mt-2"
                />
                {image && <img
                  src={URL.createObjectURL(image)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep bg-gray-200"
                  alt="Preview"
                />}
              </div>
              
              <div className="text-center">
                <button type="submit" className="bg-gray-500 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors">
                  Add Project
                </button>
                <Link to="/dashboard/projects" className="bg-gray-500 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors mt-2 inline-block">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;

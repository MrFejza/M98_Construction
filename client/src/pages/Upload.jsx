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
  const [selectedFiles, setSelectedFiles] = useState([]); // Handles multiple files

  // Status options
  const statusOptions = [
    "Perfunduar",
    "Duke u Ndertuar",
    "Fillojme se shpejti"
  ];

  // Define the handleFileChange function
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

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

    // Append selected images
    selectedFiles.forEach((file) => {
      formData.append('image', file); // Ensure 'photos' matches multer's field name
    });

    try {
      const response = await axios.post('/api/projects/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success(response.data.message || 'Project created successfully');
      // Reset form fields after successful upload
      setTitle('');
      setDescription('');
      setLocation('');
      setClient('');
      setStatus('');
      setStartDate('');
      setEndDate('');
      setBudget('');
      setSelectedFiles([]);
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
      <div className="flex justify-center items-center bg-gray-100 min-h-screen py-10">
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
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep"
                  required
                >
                  <option value="" disabled>Select status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
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
   {/* File input for multiple images */}
   <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-primary-deep mt-2"
                />
              </div>

              {/* Display selected image previews */}
              {selectedFiles.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Selected Photos:</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="w-full h-auto rounded-md border border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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

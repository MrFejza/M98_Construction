import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPhoto = () => {
  const { id } = useParams(); // Ensure this matches your backend route
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setUploadError(''); 
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file before uploading.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    try {
      const response = await axios.post(`/api/projects/${id}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message || 'Photos uploaded successfully');
      setSelectedFiles([]); // Clear selected files after successful upload
      navigate(`/information/${_id}`);
    } catch (error) {
      console.error('Error uploading photos:', error.response ? error.response.data : error.message);
      toast.error('Failed to upload photos. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-center text-primary-deep mb-8">Add Photos</h1>
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-xl mx-auto">
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
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
            {uploadError && <p className="text-red-500">{uploadError}</p>}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-blue-500 transition-colors"
              >
                Upload Photos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Ensure this includes Bootstrap and Tailwind CSS imports
import Meta from "../Meta";

const Information = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // Get the project ID from the URL params
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen toggle

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${_id}`);
        setProject(response.data);
        setImages([...(response.data.image || [])]);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [_id]); // Fetch when _id changes

  if (!project) {
    return <p>Loading...</p>; // Optionally show a loading state
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Meta title={`${project.title || "Project Information"} - Construction Company`} />
      <div className="container mx-auto mt-5 p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">{project.title}</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Carousel */}
          <div className="w-full md:w-3/5">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-touch="false"
              style={{ width: '900px', height: '600px', overflow: 'hidden' }} // Set carousel dimensions
            >
              <div className="carousel-inner" style={{ width: '100%', height: '100%' }}>
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                      key={index}
                    >
                      <img
                        src={`http://localhost:3000/${img}`} // Correctly using relative path from the image array
                        className={`d-block w-100 cursor-pointer ${isFullscreen ? 'h-screen object-contain' : 'object-cover'}`}
                        alt={`Image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain', // Ensures the image fits without cutting
                        }}
                        onClick={toggleFullscreen} // Toggle fullscreen on click
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img
                      src="path/to/default-image.jpg"
                      className="d-block w-100"
                      alt="No Images Available"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Right side - Project Information Card */}
          <div className="w-full md:w-2/5 ml-10">
            <p className="my-10">{project.description}</p>
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
              <p className="mb-4">
                <strong>Location:</strong> {project.location}
              </p>
              <p className="mb-4">
                <strong>Client:</strong> {project.client}
              </p>
              <p className="mb-4">
                <strong>Status:</strong> {project.status}
              </p>
              <p className="mb-4">
                <strong>Start Date:</strong>{' '}
                {new Date(project.startDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>End Date:</strong>{' '}
                {new Date(project.endDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>Budget:</strong>{' '}
                {new Intl.NumberFormat('en-IE', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(project.budget)}
              </p>
            </div>
                  <div className="text-center mt-4 mr-20">
          <button
            onClick={() => navigate('/projects')}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
          Back to Projects
          </button>
        </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Information;

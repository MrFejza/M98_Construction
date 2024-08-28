import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
        setImages([response.data.image, ...(response.data.additionalPhotos || [])]); // Assuming additionalPhotos is the array of images
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
            <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
              <div className="carousel-inner">
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <img
                        src={`http://localhost:3000/${project.image}`} // Ensure correct image path
                        className={`d-block w-100 cursor-pointer ${isFullscreen ? 'h-screen object-contain' : 'object-cover'}`}
                        alt={`Image ${index + 1}`}
                        onClick={toggleFullscreen} // Toggle fullscreen on click
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img src="path/to/default-image.jpg" className="d-block w-100" alt="No Images Available" />
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Right side - Project Information Card */}
          <div className="w-full md:w-2/5">
                <p className='my-10'> {project.description}</p>
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
              <p className="mb-4"><strong>Location:</strong> {project.location}</p>
              <p className="mb-4"><strong>Client:</strong> {project.client}</p>
              <p className="mb-4"><strong>Status:</strong> {project.status}</p>
              <p className="mb-4"><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
              <p className="mb-4"><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
              <p className="mb-4"><strong>Budget:</strong> {new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(project.budget)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;

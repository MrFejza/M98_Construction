import React from 'react';
import { Link } from 'react-router-dom';

const Delete = () => {
  // Add authentication check here if needed

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <form>
              <div className="mb-4">
                <button type="submit" className="bg-gray-500 w-full text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors">
                  Delete Project
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

export default Delete;
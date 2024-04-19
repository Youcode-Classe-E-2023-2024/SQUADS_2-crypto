import React from 'react';
import {Link } from 'react-router-dom';

function navBar() {
  return (
    
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">Markets</Link>
              <Link to="/Assets "className="text-base font-medium text-gray-500 hover:text-gray-900">Assets</Link>
              <Link to="/Exchanges" className="text-base font-medium text-gray-500 hover:text-gray-900">Exchanges</Link>
            </nav>
          </div>
        </div>
      </div>
  
  );
}

export default navBar;

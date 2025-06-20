
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Plus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-10 w-10 text-green-600" />
            <span className="text-xl font-bold text-gray-900">ItemMart</span>
          </div>
          
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              View Items
            </Link>
            <Link
              to="/add-item"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                location.pathname === '/add-item' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

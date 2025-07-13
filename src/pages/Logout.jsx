import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">You have been logged out</h1>
          <p className="text-gray-600 mb-6">
            Thank you for using our service. We hope to see you again soon!
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Return to Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Logout;
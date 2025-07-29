import React, { useState } from 'react';
import { FaUpload, FaDownload } from 'react-icons/fa';

// Sample CSV content
const sampleCsvContent = `name,number
John Doe,1234567890`;

const sampleCsvUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(sampleCsvContent)}`;

const UploadDatabase = () => {
  const [formData, setFormData] = useState({
    file: null,
    description: '',
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 p-6 lg:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Upload Database</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Your Database File</h2>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm text-gray-600">
              Download a sample CSV file (format: name, number)
            </p>
            <a
              href={sampleCsvUrl}
              download="sample_database.csv"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 transform hover:scale-105"
            >
              <FaDownload className="mr-2 text-sm" /> Download Sample
            </a>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Select file to upload
              </label>
              <div className="flex flex-col items-center gap-3">
                <FaUpload className="text-2xl text-gray-500" />
                <p className="text-sm text-gray-500">
                  {formData.file ? formData.file.name : 'Drag and drop your file here or click to browse'}
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    name="file"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 transform hover:scale-105">
                    <FaUpload className="mr-2 text-sm" /> Browse File
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Description (optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700"
                rows="5"
                placeholder="Enter description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Upload
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadDatabase;
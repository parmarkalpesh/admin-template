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

  const handleCancel = () => {
    setFormData({ file: null, description: '' });
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-x-hidden">
      <div className="min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Upload Database</h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm text-gray-700">
              Download a sample CSV file (format: name, number)
            </p>
            <a
              href={sampleCsvUrl}
              download="sample_database.csv"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <FaDownload className="mr-2 text-sm" /> Download Sample
            </a>
          </div>
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center transition-all duration-300 ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="block text-sm font-medium text-gray-700 mb-3">
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
                <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                  <FaUpload className="mr-2 text-sm" /> Browse File
                </span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              rows="4"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDatabase;
import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Blacklist = () => {
  const [blacklistData, setBlacklistData] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    label: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlacklistData((prev) => [
      ...prev,
      { ...formData, addedOn: new Date().toISOString().split('T')[0] },
    ]);
    setFormData({ phoneNumber: '', label: '' });
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setFormData({ phoneNumber: '', label: '' });
    setIsFormVisible(false);
  };

  const handleDelete = (index) => {
    setBlacklistData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Blacklist Numbers</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage Blacklist Numbers</h2>
            <button
              onClick={() => setIsFormVisible(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Add Number
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Label</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Added On</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blacklistData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-3 text-sm text-gray-700 text-center">
                      No numbers added to blacklist yet.
                    </td>
                  </tr>
                ) : (
                  blacklistData.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">{entry.phoneNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{entry.label}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{entry.addedOn}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                          onClick={() => console.log(`Editing ${entry.phoneNumber}`)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {isFormVisible && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Blacklist Number</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter label (e.g., Spam Caller)"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blacklist;
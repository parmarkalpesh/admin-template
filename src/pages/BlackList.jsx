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
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-x-hidden">
      <div className="min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Blacklist Numbers</h1>
        <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Manage Blacklist Numbers</h2>
            <button
              onClick={() => setIsFormVisible(true)}
              className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Add Number
            </button>
          </div>
          <div className="overflow-x-auto rounded-md border border-gray-300">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Label</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Added On</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blacklistData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-sm text-gray-700 text-center font-medium">
                      No numbers added to blacklist yet.
                    </td>
                  </tr>
                ) : (
                  blacklistData.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{entry.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{entry.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{entry.addedOn}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="p-2 text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          onClick={() => console.log(`Editing ${entry.phoneNumber}`)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter label (e.g., Spam Caller)"
                  />
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
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blacklist;
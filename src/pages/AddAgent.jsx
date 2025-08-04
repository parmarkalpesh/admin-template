import React, { useState } from 'react';

const AddAgent = () => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    phonenumber: '',
    name: '',
    password: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.phonenumber && formData.name && formData.password) {
      setAgents((prev) => [
        {
          date: new Date().toISOString().split('T')[0],
          ...formData,
        },
        ...prev,
      ]);
      setFormData({ email: '', phonenumber: '', name: '', password: '' });
      setIsFormVisible(false);
    }
  };

  const handleCancel = () => {
    setFormData({ email: '', phonenumber: '', name: '', password: '' });
    setIsFormVisible(false);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-x-hidden">
      <div className="min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add Agent</h1>
        <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Agent List */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Agent List</h2>
            <div className="overflow-x-auto rounded-md border border-gray-300">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date Added</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-sm text-gray-700 text-center font-medium">
                        No agents added yet.
                      </td>
                    </tr>
                  ) : (
                    agents.map((agent, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">{agent.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{agent.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{agent.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{agent.phonenumber}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Agent */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Add New Agent</h2>
              <button
                onClick={() => setIsFormVisible(true)}
                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                Add Agent
              </button>
            </div>
            {isFormVisible && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Agent Details</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter password"
                      />
                    </div>
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
    </div>
  );
};

export default AddAgent;
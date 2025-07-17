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
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Agent</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Agent List</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date Added</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-sm text-gray-700 text-center">
                        No agents added yet.
                      </td>
                    </tr>
                  ) : (
                    agents.map((agent, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                      >
                        <td className="px-4 py-3 text-sm text-gray-700">{agent.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{agent.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{agent.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{agent.phonenumber}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Add New Agent</h2>
              <button
                onClick={() => setIsFormVisible(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Add Agent
              </button>
            </div>
            {isFormVisible && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Agent Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter password"
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
        </div>
      </main>
    </div>
  );
};

export default AddAgent;
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', purpose: '', message: '' });
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', purpose: '', message: '' });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 p-6 lg:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Contact Us</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700"
              >
                <option value="" disabled>
                  Select purpose
                </option>
                <option value="Feedback">Feedback</option>
                <option value="Career">Career</option>
                <option value="Campaign">Campaign</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700"
                rows="5"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 bg-red-800 text-white rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
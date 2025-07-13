import React from 'react';
import { FaPlay } from 'react-icons/fa';

const CallRecordings = () => {
  const callData = [
    { caller: 'ABC', date: '2024-06-10 14:32', duration: '3m 45s', status: 'Completed' },
    { caller: 'DEF', date: '2024-06-09 09:15', duration: '2m 10s', status: 'Missed' },
    { caller: 'GHI', date: '2024-06-08 18:47', duration: '5m 20s', status: 'Completed' },
    { caller: 'JKL', date: '2024-06-07 11:22', duration: '4m 05s', status: 'Completed' },
    { caller: 'MNO', date: '2024-06-06 16:50', duration: '3m 30s', status: 'Missed' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Call Recordings</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Call Recordings</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Caller</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Play</th>
                </tr>
              </thead>
              <tbody>
                {callData.map((call, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">{call.caller}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{call.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{call.duration}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          call.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {call.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        onClick={() => console.log(`Playing recording for ${call.caller}`)}
                      >
                        <FaPlay className="mr-2 text-xs" /> Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallRecordings;
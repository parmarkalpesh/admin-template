import React, { useState, useRef } from 'react';
import { FaPlay, FaDownload, FaPause } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const CallRecordings = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [playingId, setPlayingId] = useState(null); // Track which recording is playing
  const audioRef = useRef(null); // Store the current Audio instance

  const callData = [
    { id: 1, caller: 'ABC', date: '2024-06-10 14:32', duration: '3m 45s', status: 'Completed', campaign: 'SMS', fileUrl: 'https://example.com/recordings/abc.mp3' },
    { id: 2, caller: 'DEF', date: '2024-06-09 09:15', duration: '2m 10s', status: 'Missed', campaign: 'Email', fileUrl: 'https://example.com/recordings/def.mp3' },
    { id: 3, caller: 'GHI', date: '2024-06-08 18:47', duration: '5m 20s', status: 'Completed', campaign: 'SMS', fileUrl: 'https://example.com/recordings/ghi.mp3' },
    { id: 4, caller: 'JKL', date: '2024-06-07 11:22', duration: '4m 05s', status: 'Completed', campaign: 'Voice', fileUrl: 'https://example.com/recordings/jkl.mp3' },
    { id: 5, caller: 'MNO', date: '2024-06-06 16:50', duration: '3m 30s', status: 'Missed', campaign: 'SMS', fileUrl: 'https://example.com/recordings/mno.mp3' },
  ];

  const campaigns = [...new Set(callData.map(call => call.campaign))];

  const filteredCallData = selectedCampaign
    ? callData.filter(call => call.campaign === selectedCampaign)
    : callData;

  const handleDownload = (callId) => {
    console.log(`Downloading recording for call ID: ${callId}`);
    // Simulate single file download (replace with actual API call)
  };

  const handleBulkDownload = async () => {
    if (!selectedCampaign) {
      console.log('Please select a campaign for bulk download');
      return;
    }

    setIsBulkDownloading(true);
    const zip = new JSZip();
    const recordingsToDownload = callData.filter(call => call.campaign === selectedCampaign);

    try {
      for (const recording of recordingsToDownload) {
        const response = await fetch(recording.fileUrl).catch(() => {
          return new Response(new Blob([`Mock audio content for ${recording.caller}`], { type: 'audio/mpeg' }));
        });
        const blob = await response.blob();
        const fileName = `${recording.caller}-${recording.date.replace(/[: ]/g, '-')}.mp3`;
        zip.file(fileName, blob);
      }

      const zipData = await zip.generateAsync({ type: 'blob' });
      saveAs(zipData, `${selectedCampaign}-recordings-${new Date().toISOString().split('T')[0]}.zip`);
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    } finally {
      setIsBulkDownloading(false);
    }
  };

  const handlePlayPause = (call) => {
    if (playingId === call.id) {
      // Pause the currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        audioRef.current = null;
      }
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Start playing the new audio
      const audio = new Audio(call.fileUrl);
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error(`Error playing audio for ${call.caller}:`, error);
        // Fallback: Simulate audio playback with mock content
        const mockAudio = new Audio(URL.createObjectURL(new Blob([`Mock audio content for ${call.caller}`], { type: 'audio/mpeg' })));
        audioRef.current = mockAudio;
        mockAudio.play().catch((err) => console.error('Error playing mock audio:', err));
      });
      setPlayingId(call.id);
      // Reset when audio ends
      audio.onended = () => {
        setPlayingId(null);
        audioRef.current = null;
      };
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 p-6 lg:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Call Recordings</h1>
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">Recent Call Recordings</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 text-sm"
              >
                <option value="">All Campaigns</option>
                {campaigns.map((campaign, index) => (
                  <option key={index} value={campaign}>{campaign}</option>
                ))}
              </select>
              <button
                onClick={handleBulkDownload}
                className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ${isBulkDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={!selectedCampaign || isBulkDownloading}
              >
                <FaDownload className="mr-2 text-sm" /> {isBulkDownloading ? 'Downloading...' : 'Bulk Download'}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Caller</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Campaign</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Play</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallData.length > 0 ? (
                  filteredCallData.map((call) => (
                    <tr
                      key={call.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{call.caller}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{call.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{call.duration}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                            call.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{call.campaign}</td>
                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-sm hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 transform hover:scale-105"
                          onClick={() => handlePlayPause(call)}
                        >
                          {playingId === call.id ? (
                            <>
                              <FaPause className="mr-2 text-sm" /> Pause
                            </>
                          ) : (
                            <>
                              <FaPlay className="mr-2 text-sm" /> Play
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-sm hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 transform hover:scale-105"
                          onClick={() => handleDownload(call.id)}
                        >
                          <FaDownload className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-sm text-gray-600 text-center font-medium">
                      No recordings found for the selected campaign.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallRecordings;
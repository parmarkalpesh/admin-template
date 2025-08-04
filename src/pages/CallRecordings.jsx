import React, { useState, useRef } from 'react';
import { FaPlay, FaDownload, FaPause } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const CallRecordings = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

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
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        audioRef.current = null;
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      const audio = new Audio(call.fileUrl);
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error(`Error playing audio for ${call.caller}:`, error);
        const mockAudio = new Audio(URL.createObjectURL(new Blob([`Mock audio content for ${call.caller}`], { type: 'audio/mpeg' })));
        audioRef.current = mockAudio;
        mockAudio.play().catch((err) => console.error('Error playing mock audio:', err));
      });
      setPlayingId(call.id);
      audio.onended = () => {
        setPlayingId(null);
        audioRef.current = null;
      };
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-x-hidden">
      <div className="min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Call Recordings</h1>
        <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-700">Recent Call Recordings</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-700"
              >
                <option value="">All Campaigns</option>
                {campaigns.map((campaign, index) => (
                  <option key={index} value={campaign}>{campaign}</option>
                ))}
              </select>
              <button
                onClick={handleBulkDownload}
                className={`inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${isBulkDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={!selectedCampaign || isBulkDownloading}
              >
                <FaDownload className="mr-2 text-sm" /> {isBulkDownloading ? 'Downloading...' : 'Bulk Download'}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-md border border-gray-300">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Caller</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Campaign</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Play</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallData.length > 0 ? (
                  filteredCallData.map((call) => (
                    <tr
                      key={call.id}
                      className="border-b border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{call.caller}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{call.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{call.duration}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
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
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                          className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          onClick={() => handleDownload(call.id)}
                        >
                          <FaDownload className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-sm text-gray-700 text-center font-medium">
                      No recordings found for the selected campaign.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallRecordings;
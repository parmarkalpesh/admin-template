import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Instagram', 'WhatsApp', 'Email', 'SMS'],
        datasets: [{
          label: 'Campaign Distribution',
          data: [32, 85, 47, 23],
          backgroundColor: ['#4fd1c5', '#60a5fa', '#facc15', '#f87171'],
          borderColor: ['#38b2ac', '#3b82f6', '#eab308', '#ef4444'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#1f2937'
            }
          }
        }
      }
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <main className="p-6 bg-[#f0f2f5] min-h-screen text-[#333]">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#1f2937]">Dashboard</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </header>

      <section className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <p className="text-gray-500">Campaign</p>
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Campaign Distribution</h2>
          <div className="h-64">
            <canvas ref={chartRef} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
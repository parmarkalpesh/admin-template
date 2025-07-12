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
      type: 'bar',
      data: {
        labels: ['Connected', 'Answered', 'Unanswered', 'Rejected'],
        datasets: [{
          label: 'Call Stats',
          data: [256, 182, 38, 19],
          backgroundColor: ['#4fd1c5', '#60a5fa', '#facc15', '#f87171'],
          borderColor: ['#38b2ac', '#3b82f6', '#eab308', '#ef4444'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Cleanup when component unmounts
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <main className="p-6 bg-[#f0f2f5] min-h-screen text-[#333]">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#1f2937]">Dashboard</h1>
        <input type="text" placeholder="Search..." className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          { title: 'Connected Calls', value: 256 },
          { title: 'Call Connect %', value: '72%' },
          { title: 'Answered Calls', value: 182 },
          { title: 'Unanswered Calls', value: 38 },
          { title: 'Rejected Calls', value: 19 }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <p className="text-gray-500">{card.title}</p>
            <h2 className="text-2xl font-bold text-[#111827]">{card.value}</h2>
          </div>
        ))}
      </section>

      <section className="mt-8 h-96">
        <h2 className="text-2xl font-semibold text-[#1f2937] mb-4">Call Statistics</h2>
        <canvas ref={chartRef} className="bg-white rounded-xl shadow-md p-6 w-full h-full" />
      </section>
    </main>
  );
};

export default Dashboard;

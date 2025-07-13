import React, { useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(1250.0);
  const [transactionData, setTransactionData] = useState([
    { date: '2024-06-10', description: 'Deposit', amount: '-$500.00', status: 'Completed' },
    { date: '2024-06-05', description: 'Withdrawal', amount: '-$200.00', status: 'Completed' },
    { date: '2024-06-01', description: 'Payment', amount: '-$150.00', status: 'Completed' },
    { date: '2024-05-28', description: 'Deposit', amount: '+$300.00', status: 'Completed' },
  ]);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
    description: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (!isNaN(amount) && amount > 0 && formData.paymentMethod) {
      setTransactionData((prev) => [
        {
          date: new Date().toISOString().split('T')[0],
          description: `Deposit via ${formData.paymentMethod}`,
          amount: `+$${amount.toFixed(2)}`,
          status: 'Completed',
        },
        ...prev,
      ]);
      setBalance((prev) => prev + amount);
      setFormData({ amount: '', paymentMethod: '', description: '' });
      setIsFormVisible(false);
    }
  };

  const handleCancel = () => {
    setFormData({ amount: '', paymentMethod: '', description: '' });
    setIsFormVisible(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Wallet</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Current Balance */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Balance</h2>
            <div className="text-3xl font-bold text-blue-600">${balance.toFixed(2)}</div>
          </div>

          {/* Transaction History */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">{transaction.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{transaction.description}</td>
                      <td
                        className={`px-4 py-3 text-sm ${
                          transaction.amount.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Funds */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Manage Funds</h2>
              <button
                onClick={() => setIsFormVisible(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Add Funds
              </button>
            </div>
            {isFormVisible && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Funds</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter amount"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="" disabled>
                        Select payment method
                      </option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Credit Card">Credit Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Description (optional)</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      rows="4"
                      placeholder="Enter description"
                    ></textarea>
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

export default Wallet;
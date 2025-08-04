import React, { useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(1250.0);
  const [transactionData, setTransactionData] = useState([
    { date: '2024-06-10', description: 'Deposit', amount: '+$500.00', status: 'Completed' },
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
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-x-hidden">
      <div className="min-h-full w-full max-w-screen-xl mx-auto bg-white shadow-xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Wallet</h1>
        <div className="space-y-6 w-full max-w-4xl mx-auto Aveva-6 sm:px-6 md:px-8">
          {/* Current Balance */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Balance</h2>
            <div className="text-3xl font-bold text-indigo-600">${balance.toFixed(2)}</div>
          </div>

          {/* Transaction History */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaction History</h2>
            <div className="overflow-x-auto rounded-md border border-gray-300">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-sm text-gray-700 text-center font-medium">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactionData.map((transaction, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">{transaction.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{transaction.description}</td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            transaction.amount.startsWith('+')
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Funds */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Manage Funds</h2>
              <button
                onClick={() => setIsFormVisible(true)}
                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                Add Funds
              </button>
            </div>
            {isFormVisible && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Funds</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Enter amount"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                    <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      rows="4"
                      placeholder="Enter description"
                    ></textarea>
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

export default Wallet;
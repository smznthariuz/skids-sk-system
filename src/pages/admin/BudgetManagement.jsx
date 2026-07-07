import React, { useState, useEffect } from 'react';
import { 
  IoAddOutline, 
  IoPencilOutline, 
  IoTrashOutline, 
  IoWalletOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoDocumentTextOutline,
  IoCloseOutline,
  IoEyeOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { getBudgetReports } from '../../utils/mockData';

const BudgetManagement = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [previewBudget, setPreviewBudget] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    amount: '',
    breakdown: '',
    document: null,
  });

  useEffect(() => {
    const data = getBudgetReports();
    setBudgetData(data);
  }, []);

  // Handle card click to preview
  const handleCardClick = (budget) => {
    setPreviewBudget(budget);
    setIsPreviewModalOpen(true);
  };

  const columns = [
    { 
      key: 'title', 
      header: 'Report Title',
      render: (row) => (
        <button
          onClick={() => handleCardClick(row)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer transition-colors text-left"
        >
          {row.title}
        </button>
      )
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (row) => (
        <span className="font-semibold text-green-600">₱{parseFloat(row.amount).toLocaleString()}</span>
      )
    },
    { 
      key: 'date', 
      header: 'Date',
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IoCalendarOutline className="w-4 h-4 text-gray-400" />
          {new Date(row.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
      )
    },
    { 
      key: 'breakdown', 
      header: 'Breakdown',
      render: (row) => (
        <div className="max-w-xs truncate text-sm text-gray-600">
          {row.breakdown || 'N/A'}
        </div>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEdit(row)}
            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
            title="Edit"
          >
            <IoPencilOutline className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            title="Delete"
          >
            <IoTrashOutline className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setSelectedBudget(null);
    setFormData({ title: '', date: '', amount: '', breakdown: '', document: null });
    setIsModalOpen(true);
  };

  const handleEdit = (budget) => {
    setSelectedBudget(budget);
    setFormData(budget);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget report?')) {
      setBudgetData(budgetData.filter(b => b.id !== id));
    }
  };

  const handleSubmit = () => {
    if (selectedBudget) {
      setBudgetData(budgetData.map(b => 
        b.id === selectedBudget.id ? { ...b, ...formData } : b
      ));
    } else {
      const newBudget = {
        id: budgetData.length + 1,
        ...formData,
        date: formData.date || new Date().toISOString().split('T')[0],
        fileName: formData.document?.name || 'No file attached'
      };
      setBudgetData([...budgetData, newBudget]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0]
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budget Report</h1>
          <p className="text-slate-500 mt-1">Upload financial reports and supporting budget documents.</p>
        </div>
        <Button onClick={handleAdd} icon={IoAddOutline}>
          Upload Report
        </Button>
      </div>

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetData.map((budget) => (
          <div 
            key={budget.id}
            onClick={() => handleCardClick(budget)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <IoWalletOutline className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400">
                {new Date(budget.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">{budget.title}</h3>
            <p className="text-2xl font-bold text-green-600 mb-2">
              ₱{parseFloat(budget.amount).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 line-clamp-2">{budget.breakdown || 'No breakdown provided'}</p>
            {budget.fileName && budget.fileName !== 'No file attached' && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <IoDocumentTextOutline className="w-4 h-4" />
                {budget.fileName}
              </div>
            )}
          </div>
        ))}
        {budgetData.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <IoWalletOutline className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium">No budget reports yet</p>
            <p className="text-sm">Upload your first budget report to get started.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Budget Report Details"
        size="lg"
        showCloseButton={true}
      >
        {previewBudget && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Report Title</p>
                <p className="font-semibold text-gray-800 mt-1">{previewBudget.title}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Amount</p>
                <p className="font-bold text-green-600 text-xl mt-1">
                  ₱{parseFloat(previewBudget.amount).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                <p className="font-medium text-gray-700 mt-1">
                  {new Date(previewBudget.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Attachment</p>
                <p className="font-medium text-gray-700 mt-1">
                  {previewBudget.fileName || 'No file attached'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Detailed Breakdown</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {previewBudget.breakdown || 'No breakdown provided'}
              </p>
            </div>

            {previewBudget.fileName && previewBudget.fileName !== 'No file attached' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Attached Document</p>
                <div className="flex items-center gap-3">
                  <IoDocumentTextOutline className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-700">{previewBudget.fileName}</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                      Download File
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setIsPreviewModalOpen(false)}>
                <IoCloseOutline className="w-4 h-4 mr-1" />
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                setIsPreviewModalOpen(false);
                handleEdit(previewBudget);
              }}>
                <IoPencilOutline className="w-4 h-4 mr-1" />
                Edit Report
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBudget ? 'Edit Budget Report' : 'Upload Budget Report'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Report Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Amount"
              name="amount"
              placeholder="₱0.00"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Breakdown</label>
            <textarea
              name="breakdown"
              value={formData.breakdown}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter budget details, line items, and explanation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Attach Supporting Document</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {selectedBudget ? 'Update' : 'Save'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BudgetManagement;
import React, { useState, useEffect } from 'react';
import { 
  IoWalletOutline, 
  IoCheckmarkCircle, 
  IoTimeOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoEyeOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { getBudgetReports } from '../../utils/mockData';

const BudgetTransparency = () => {
  const [budgetReports, setBudgetReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setBudgetReports(getBudgetReports());
  }, []);

  const totalBudget = budgetReports.reduce((sum, report) => {
    const amount = parseFloat(report.amount.replace(/[₱,]/g, ''));
    return sum + amount;
  }, 0);

  const getStatusIcon = (status) => {
    return status === 'Approved' ? 
      <IoCheckmarkCircle className="w-5 h-5 text-green-500" /> : 
      <IoTimeOutline className="w-5 h-5 text-yellow-500" />;
  };

  // Handle card click to preview
  const handleCardClick = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Budget Transparency</h1>
        <p className="text-gray-500 mt-1">View SK budget reports and fund allocations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-2xl font-bold text-primary-600">
            ₱{totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-500">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900">{budgetReports.length}</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-500">Approved Reports</p>
          <p className="text-2xl font-bold text-green-600">
            {budgetReports.filter(r => r.status === 'Approved').length}
          </p>
        </Card>
      </div>

      {/* Budget Reports List - Clickable Cards */}
      <div className="space-y-4">
        {budgetReports.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No budget reports available.</p>
          </Card>
        ) : (
          budgetReports.map((report) => (
            <Card 
              key={report.id} 
              className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-blue-300 border-2 border-transparent"
              onClick={() => handleCardClick(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <IoWalletOutline className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-medium text-gray-900">{report.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">{report.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{report.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        <span className={`text-sm font-medium ${
                          report.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <IoEyeOutline className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Budget Report Details"
        size="lg"
        showCloseButton={true}
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Report Title</p>
                <p className="font-semibold text-gray-800 mt-1">{selectedReport.title}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Amount</p>
                <p className="font-bold text-green-600 text-xl mt-1">{selectedReport.amount}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Category</p>
                <p className="font-medium text-gray-700 mt-1">{selectedReport.category}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                <p className="font-medium text-gray-700 mt-1">{selectedReport.date}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Description / Breakdown</p>
              <p className="text-gray-700">
                {selectedReport.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedReport.status)}
                <span className={`font-medium ${
                  selectedReport.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              {selectedReport.status === 'Approved' && (
                <span className="text-xs text-gray-400">✓ This report has been approved</span>
              )}
              {selectedReport.status === 'Pending' && (
                <span className="text-xs text-gray-400">⏳ Waiting for approval</span>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                <IoCloseOutline className="w-4 h-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BudgetTransparency;
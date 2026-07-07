import React, { useState, useEffect } from 'react';
import { 
  IoDocumentTextOutline, 
  IoDownloadOutline, 
  IoSearchOutline,
  IoEyeOutline,
  IoCloseOutline,
  IoCalendarOutline,
  IoFileTrayOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoAlertCircleOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { getDocuments } from '../../utils/mockData';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'Approved': 'bg-green-100 text-green-700',
      'Filed': 'bg-blue-100 text-blue-700',
      'Draft': 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved':
        return <IoCheckmarkCircle className="w-4 h-4 text-green-500" />;
      case 'Filed':
        return <IoFileTrayOutline className="w-4 h-4 text-blue-500" />;
      case 'Draft':
        return <IoTimeOutline className="w-4 h-4 text-yellow-500" />;
      default:
        return <IoAlertCircleOutline className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleDownload = (doc, e) => {
    e.stopPropagation(); // Prevent card click from triggering
    alert(`Downloading: ${doc.title}`);
  };

  const handleCardClick = (doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const getFileIcon = (type) => {
    if (type === 'PDF') return '📄';
    if (type === 'Word') return '📝';
    if (type === 'Excel') return '📊';
    return '📁';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">Access official SK documents, resolutions, and reports.</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={IoSearchOutline}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              <IoDocumentTextOutline className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-medium">No documents found</p>
              <p className="text-sm">Try adjusting your search terms.</p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-blue-300 border-2 border-transparent"
                onClick={() => handleCardClick(doc)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <IoDocumentTextOutline className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{doc.title}</h4>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <span className="text-sm">{getFileIcon(doc.type)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{doc.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{doc.fileSize}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(doc);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => handleDownload(doc, e)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Download"
                        >
                          <IoDownloadOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Document Details"
        size="lg"
        showCloseButton={true}
      >
        {selectedDoc && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-primary-50 rounded-xl">
                <IoDocumentTextOutline className="w-10 h-10 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{selectedDoc.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">{selectedDoc.type}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{selectedDoc.fileSize}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedDoc.status)}`}>
                    {selectedDoc.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Resolution Number</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {selectedDoc.resolutionNumber || 'N/A'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date Approved</p>
                <p className="font-semibold text-gray-800 mt-1 flex items-center gap-2">
                  <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                  {selectedDoc.date || 'N/A'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Description</p>
              <p className="text-gray-700">
                {selectedDoc.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedDoc.status)}
                <span className={`font-medium ${
                  selectedDoc.status === 'Approved' ? 'text-green-600' :
                  selectedDoc.status === 'Filed' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {selectedDoc.status}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {selectedDoc.status === 'Approved' ? '✓ This document has been approved' :
                 selectedDoc.status === 'Filed' ? '📁 This document has been filed' :
                 '⏳ This document is in draft'}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                <IoCloseOutline className="w-4 h-4 mr-1" />
                Close
              </Button>
              <Button variant="primary" onClick={(e) => handleDownload(selectedDoc, e)}>
                <IoDownloadOutline className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Documents;
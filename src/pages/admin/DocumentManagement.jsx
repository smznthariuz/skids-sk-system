import React, { useState, useEffect } from 'react';
import { 
  IoAddOutline, 
  IoTrashOutline, 
  IoDownloadOutline, 
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoEyeOutline,
  IoFileTrayOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { getDocuments } from '../../utils/mockData';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    resolutionNumber: '',
    date: '',
    description: '',
    file: null
  });

  useEffect(() => {
    const data = getDocuments();
    setDocuments(data);
  }, []);

  // Handle card click to preview
  const handleCardClick = (doc) => {
    setPreviewDocument(doc);
    setIsPreviewModalOpen(true);
  };

  // Filter documents based on search
  const filteredDocuments = documents.filter(doc => {
    const query = searchTerm.toLowerCase();
    return (
      doc.title?.toLowerCase().includes(query) ||
      doc.resolutionNumber?.toLowerCase().includes(query) ||
      doc.description?.toLowerCase().includes(query) ||
      doc.fileName?.toLowerCase().includes(query) ||
      doc.type?.toLowerCase().includes(query)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const handleSubmit = () => {
    if (formData.file) {
      const newDocument = {
        id: documents.length + 1,
        title: formData.title,
        resolutionNumber: formData.resolutionNumber,
        date: formData.date || new Date().toISOString().split('T')[0],
        description: formData.description,
        fileName: formData.file.name,
      };
      setDocuments([...documents, newDocument]);
      setIsModalOpen(false);
      setFormData({ title: '', resolutionNumber: '', date: '', description: '', file: null });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDownload = (doc) => {
    // Simulate download
    alert(`Downloading: ${doc.fileName || doc.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Approved Resolution</h1>
          <p className="text-slate-500 mt-1">Upload approved resolutions with supporting documentation.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={IoAddOutline}>
          Upload Resolution
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <Input
          placeholder="Search resolutions by title, number, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={IoDocumentTextOutline}
        />
      </Card>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => handleCardClick(doc)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <IoDocumentTextOutline className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400">
                {doc.resolutionNumber || 'No #'}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">{doc.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <IoCalendarOutline className="w-4 h-4 text-gray-400" />
              {new Date(doc.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">{doc.description || 'No description provided'}</p>
            {doc.fileName && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <IoFileTrayOutline className="w-4 h-4" />
                {doc.fileName}
              </div>
            )}
          </div>
        ))}
        {filteredDocuments.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <IoDocumentTextOutline className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium">No resolutions found</p>
            <p className="text-sm">Upload your first approved resolution to get started.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Resolution Details"
        size="lg"
        showCloseButton={true}
      >
        {previewDocument && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Resolution Title</p>
                <p className="font-semibold text-gray-800 mt-1">{previewDocument.title}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Resolution Number</p>
                <p className="font-semibold text-gray-800 mt-1">{previewDocument.resolutionNumber || 'N/A'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date Approved</p>
                <p className="font-medium text-gray-700 mt-1">
                  {new Date(previewDocument.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Attached Document</p>
                <p className="font-medium text-gray-700 mt-1 flex items-center gap-2">
                  <IoFileTrayOutline className="w-4 h-4 text-gray-400" />
                  {previewDocument.fileName || 'No file attached'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Description</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {previewDocument.description || 'No description provided'}
              </p>
            </div>

            {previewDocument.fileName && (
              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Attached File</p>
                <div className="flex items-center gap-3">
                  <IoDocumentTextOutline className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-700">{previewDocument.fileName}</p>
                    <button 
                      onClick={() => handleDownload(previewDocument)}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <IoDownloadOutline className="w-4 h-4" />
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
              <Button variant="danger" onClick={() => {
                setIsPreviewModalOpen(false);
                handleDelete(previewDocument.id);
              }}>
                <IoTrashOutline className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Approved Resolution"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Resolution Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Resolution Number"
              name="resolutionNumber"
              value={formData.resolutionNumber}
              onChange={handleInputChange}
            />
            <Input
              label="Date Approved"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Describe the approved resolution"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Attach Document</label>
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
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentManagement;
import React, { useState, useEffect } from 'react';
import { 
  IoAddOutline, 
  IoPencilOutline, 
  IoTrashOutline,
  IoMegaphoneOutline,
  IoCloseOutline,
  IoCheckmarkOutline,
  IoCalendarOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { getAnnouncements } from '../../utils/mockData';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = getAnnouncements();
    setAnnouncements(data);
  }, []);

  const columns = [
    { key: 'title', header: 'Title' },
    { 
      key: 'content', 
      header: 'Content',
      render: (row) => (
        <div className="max-w-xs truncate">{row.content}</div>
      )
    },
    { 
      key: 'date', 
      header: 'Date',
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IoCalendarOutline className="w-4 h-4 text-gray-400" />
          {row.date}
        </div>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEdit(row)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="Edit"
          >
            <IoPencilOutline className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row)}
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            title="Delete"
          >
            <IoTrashOutline className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredData = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedAnnouncement(null);
    setFormData({ title: '', content: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({ 
      title: announcement.title, 
      content: announcement.content 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setAnnouncements(announcements.filter(a => a.id !== selectedAnnouncement.id));
    setIsDeleteModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleSubmit = () => {
    if (selectedAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === selectedAnnouncement.id ? { 
          ...a, 
          ...formData,
          date: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })
        } : a
      ));
    } else {
      const newAnnouncement = {
        id: announcements.length + 1,
        ...formData,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500 mt-1">Create and manage SK announcements.</p>
        </div>
        <Button onClick={handleAdd} icon={IoAddOutline}>
          New Announcement
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={IoMegaphoneOutline}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredData}
          emptyMessage="No announcements found."
        />
      </Card>

      {/* Add/Edit Modal - Matching Reference Image */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}
        size="lg"
        showCloseButton={true}
      >
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              TITLE
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter announcement title"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              CONTENT
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Write your announcement content here..."
              required
            />
          </div>

          {/* Preview of how it will look */}
          {formData.title && formData.content && (
            <div className="border-t border-gray-200 pt-4 mt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800">{formData.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{formData.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              className="px-6 py-2.5"
            >
              {selectedAnnouncement ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Announcement"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <IoTrashOutline className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete the announcement "<strong>{selectedAnnouncement?.title}</strong>"? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAnnouncements;
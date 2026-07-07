import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoPeopleOutline, 
  IoMegaphoneOutline, 
  IoCalendarOutline, 
  IoChatbubbleOutline,
  IoTimeOutline,
  IoAddOutline,
  IoDocumentTextOutline,
  IoWalletOutline,
  IoNotificationsOutline,
  IoArrowForwardOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCloseOutline,
  IoCheckmarkOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { getDashboardStats, mockActivityLog } from '../../utils/mockData';

const StatCard = ({ title, value, icon: Icon, color = 'primary', subtitle, onClick }) => {
  const colors = {
    primary: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:border-blue-300 hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalYouth: 0,
    totalAnnouncements: 0,
    totalEvents: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalBudget: 0,
    totalResolutions: 0
  });
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
    const dashboardStats = getDashboardStats();
    setStats({
      totalYouth: dashboardStats.totalYouth || 1,
      totalAnnouncements: dashboardStats.totalAnnouncements || 1,
      totalEvents: dashboardStats.totalEvents || 0,
      totalMessages: dashboardStats.totalMessages || 0,
      unreadMessages: dashboardStats.unreadMessages || 0,
      totalBudget: 1,
      totalResolutions: 1
    });
    
    // Mock announcements
    setAnnouncements([
      {
        id: 1,
        title: 'May nakawala na asong may rabies',
        content: 'pinapag alam po natin sa publiko na merong nakatakas na asong may rabbies sa sitio ilaya, pinapagingat po ang lahat ng taong naroroon habang hindi pa nahuhuli ang naturang hayop.',
        date: 'Apr 25, 2026'
      },
      {
        id: 2,
        title: 'Barangay Clean-Up Drive',
        content: 'All youth are encouraged to join the Barangay Clean-Up Drive this coming Saturday. Meeting at 7AM at the barangay hall.',
        date: 'Apr 20, 2026'
      }
    ]);
  }, []);

  // Navigation handlers for stat cards
  const handleBudgetClick = () => {
    navigate('/admin/budget');
  };

  const handleResolutionClick = () => {
    navigate('/admin/documents');
  };

  const handleEventsClick = () => {
    navigate('/admin/events');
  };

  // Filter announcements based on search
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 p-8 text-white shadow-xl shadow-blue-900/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-200/80">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Welcome back, intia.kenivan!</h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100/80">
            Sangguniang Kabataan Information Distribution System
          </p>
        </div>
      </div>

      {/* Stats Grid - Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Total Budget Report"
          value={stats.totalBudget}
          icon={IoWalletOutline}
          color="green"
          subtitle="Click to view →"
          onClick={handleBudgetClick}
        />
        <StatCard
          title="Total Resolution"
          value={stats.totalResolutions}
          icon={IoDocumentTextOutline}
          color="orange"
          subtitle="Click to view →"
          onClick={handleResolutionClick}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.totalEvents}
          icon={IoCalendarOutline}
          color="purple"
          subtitle="Click to view →"
          onClick={handleEventsClick}
        />
      </div>

      {/* Announcements Section - Full CRUD on Dashboard */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <IoMegaphoneOutline className="w-5 h-5 text-blue-600" />
            Announcements
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={IoMegaphoneOutline}
                className="w-full sm:w-64"
              />
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              icon={IoAddOutline}
              onClick={handleAdd}
            >
              New Announcement
            </Button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(announcement)}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <IoPencilOutline className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement)}
                      className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <IoMegaphoneOutline className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-sm">No announcements found</p>
              {searchTerm && (
                <p className="text-xs mt-1">Try adjusting your search</p>
              )}
            </div>
          )}
        </div>

        {/* Announcement Count */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
          <span>Total: {filteredData.length} announcement{filteredData.length !== 1 ? 's' : ''}</span>
          {searchTerm && filteredData.length !== announcements.length && (
            <span>Filtered from {announcements.length} total</span>
          )}
        </div>
      </Card>

      {/* Add/Edit Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}
        size="lg"
        showCloseButton={true}
      >
        <div className="space-y-6">
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

export default AdminDashboard;
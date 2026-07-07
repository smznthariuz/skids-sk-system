import React, { useState, useEffect } from 'react';
import { 
  IoMailOutline, 
  IoMailOpenOutline, 
  IoTrashOutline, 
  IoPaperPlaneOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoChatbubbleOutline,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoCloseOutline,
  IoAttachOutline,
  IoFlagOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { getMessages } from '../../utils/mockData';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = getMessages();
    setMessages(data);
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    // Mark as read
    setMessages((prev) => prev.map((m) => 
      m.id === message.id ? { ...m, status: 'read' } : m
    ));
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      alert('Please enter a reply message.');
      return;
    }
    alert(`Reply sent to ${selectedMessage.sender}: ${replyText}`);
    setReplyText('');
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const getStatusIcon = (status) => {
    return status === 'unread' ? 
      <IoMailOutline className="w-5 h-5 text-blue-500" /> : 
      <IoMailOpenOutline className="w-5 h-5 text-gray-400" />;
  };

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter;
    const matchesSearch = searchTerm === '' || 
                          message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const readCount = messages.filter(m => m.status === 'read').length;

  // Handle filter click from stats
  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Feedback Box</h1>
          <p className="text-slate-500 mt-1">Review feedback from youth members and track read status.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-blue-600">{unreadCount}</span> unread
          </span>
        </div>
      </div>

      {/* Stats Row - Clickable Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div 
          onClick={() => handleFilterClick('all')}
          className={`bg-white rounded-xl p-4 border-2 shadow-sm text-center cursor-pointer transition-all hover:shadow-md ${
            filter === 'all' 
              ? 'border-blue-500 shadow-blue-100 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
          <p className={`text-2xl font-bold ${filter === 'all' ? 'text-blue-600' : 'text-gray-800'}`}>
            {messages.length}
          </p>
        </div>
        <div 
          onClick={() => handleFilterClick('unread')}
          className={`bg-white rounded-xl p-4 border-2 shadow-sm text-center cursor-pointer transition-all hover:shadow-md ${
            filter === 'unread' 
              ? 'border-blue-500 shadow-blue-100 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider">Unread</p>
          <p className={`text-2xl font-bold ${filter === 'unread' ? 'text-blue-600' : 'text-gray-800'}`}>
            {unreadCount}
          </p>
        </div>
        <div 
          onClick={() => handleFilterClick('read')}
          className={`bg-white rounded-xl p-4 border-2 shadow-sm text-center cursor-pointer transition-all hover:shadow-md ${
            filter === 'read' 
              ? 'border-blue-500 shadow-blue-100 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider">Read</p>
          <p className={`text-2xl font-bold ${filter === 'read' ? 'text-blue-600' : 'text-gray-800'}`}>
            {readCount}
          </p>
        </div>
      </div>

      <Card className="p-6">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by sender, subject, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'unread' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === 'read' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <IoMailOpenOutline className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium">No feedback messages</p>
              <p className="text-sm">
                {filter !== 'all' 
                  ? `No ${filter} messages found.` 
                  : 'No messages match your current filters.'}
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
                  message.status === 'unread' 
                    ? 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 shadow-sm' 
                    : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                        {message.sender.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{message.sender}</p>
                        <p className="text-xs text-gray-400">{message.subject}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 ml-11">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(message.status)}
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        message.status === 'unread' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <IoTimeOutline className="w-3 h-3" />
                      {message.date}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredMessages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <span>Showing {filteredMessages.length} of {messages.length} messages</span>
            {filter !== 'all' && (
              <span>Filtered by: <span className="font-medium capitalize">{filter}</span></span>
            )}
          </div>
        )}
      </Card>

      {/* View/Reply Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Message Details"
        size="lg"
        showCloseButton={true}
      >
        {selectedMessage && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {selectedMessage.sender.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selectedMessage.sender}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.subject}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <IoTimeOutline className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-400">{selectedMessage.date}</p>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                selectedMessage.status === 'unread' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {selectedMessage.status}
              </span>
            </div>
            
            {/* Message Content */}
            <div className="py-2">
              <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
            </div>

            {/* Reply Section */}
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reply to {selectedMessage.sender}</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows="3"
                placeholder="Type your reply here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                <IoAttachOutline className="w-4 h-4" />
                <span>Attachments are not supported in this version</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                <IoCloseOutline className="w-4 h-4 mr-1" />
                Close
              </Button>
              <Button 
                variant="primary" 
                onClick={handleReply} 
                icon={IoPaperPlaneOutline}
                disabled={!replyText.trim()}
                className={!replyText.trim() ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;
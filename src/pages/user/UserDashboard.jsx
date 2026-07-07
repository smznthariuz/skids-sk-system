import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoMegaphoneOutline, 
  IoCalendarOutline, 
  IoWalletOutline,
  IoDocumentTextOutline,
  IoChatbubbleOutline,
  IoArrowForwardOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import { getAnnouncements, getEvents } from '../../utils/mockData';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setAnnouncements(getAnnouncements().slice(0, 5));
    setEvents(getEvents().slice(0, 3));
  }, []);

  // Navigation handlers for quick links
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to SKIDS!</h1>
        <p className="text-gray-500 mt-1">Stay updated with the latest SK announcements, events, and information.</p>
      </div>

      {/* Quick Links - Clickable Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <Card 
          className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-blue-300 border-2 border-transparent"
          onClick={() => handleNavigate('/user/announcements')}
        >
          <IoMegaphoneOutline className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Announcements</p>
        </Card>
        <Card 
          className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-green-300 border-2 border-transparent"
          onClick={() => handleNavigate('/user/events')}
        >
          <IoCalendarOutline className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Events</p>
        </Card>
        <Card 
          className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-yellow-300 border-2 border-transparent"
          onClick={() => handleNavigate('/user/budget')}
        >
          <IoWalletOutline className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Budget</p>
        </Card>
        <Card 
          className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-purple-300 border-2 border-transparent"
          onClick={() => handleNavigate('/user/documents')}
        >
          <IoDocumentTextOutline className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Documents</p>
        </Card>
        <Card 
          className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-blue-300 border-2 border-transparent"
          onClick={() => handleNavigate('/user/messages')}
        >
          <IoChatbubbleOutline className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Messages</p>
        </Card>
      </div>

      {/* Announcements Section - Full Width */}
      <div className="mb-6">
        <Card title="Announcements" className="p-6">
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {announcements.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No announcements available.</p>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-gray-50/50 p-3 rounded-lg transition-colors -mx-3">
                  <p className="text-sm font-semibold text-gray-900">{announcement.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                </div>
              ))
            )}
          </div>
          {announcements.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button 
                onClick={() => handleNavigate('/user/announcements')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All Announcements
                <IoArrowForwardOutline className="w-4 h-4" />
              </button>
            </div>
          )}
        </Card>
      </div>

      {/* Events Section */}
      <div>
        <Card title="Upcoming Events" className="p-6">
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming events.</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  <p className="text-xs text-gray-400">{event.location}</p>
                </div>
              ))
            )}
          </div>
          {events.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button 
                onClick={() => handleNavigate('/user/events')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All Events
                <IoArrowForwardOutline className="w-4 h-4" />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
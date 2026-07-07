import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoWalletOutline,
  IoDocumentTextOutline,
  IoChatbubbleOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import skidsLogo from '../../assets/images/skids.svg';

const Sidebar = ({ isOpen, onClose, role = 'admin' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { path: '/admin', icon: IoHomeOutline, label: 'Home', exact: true },
    { path: '/admin/youth', icon: IoPeopleOutline, label: 'Youth Information' },
    { path: '/admin/events', icon: IoCalendarOutline, label: 'Event Schedule' },
    { path: '/admin/budget', icon: IoWalletOutline, label: 'Budget Report' },
    { path: '/admin/documents', icon: IoDocumentTextOutline, label: 'Approved Resolution' },
    { path: '/admin/messages', icon: IoChatbubbleOutline, label: 'Feedback Box' },
  ];

  const userMenuItems = [
    { path: '/user', icon: IoHomeOutline, label: 'Home', exact: true },
    { path: '/user/profile', icon: IoPersonCircleOutline, label: 'Profile' },
    { path: '/user/events', icon: IoCalendarOutline, label: 'Event Calendar' },
    { path: '/user/budget', icon: IoWalletOutline, label: 'Budget Allocation' },
    { path: '/user/documents', icon: IoDocumentTextOutline, label: 'Approved Resolution' },
    { path: '/user/messages', icon: IoChatbubbleOutline, label: 'Feedback and Suggestions' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;
  const displayName = user?.name || 'SK Chairwoman';
  const displayRole = user?.role === 'admin' ? 'SK Admin' : 'Youth Member';
  

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] z-50
          transition-transform duration-300 ease-in-out
          w-72 max-w-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:top-2 lg:h-full lg:translate-x-0 lg:static
          bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900
          border-r border-blue-600/30
          shadow-xl shadow-blue-900/20
        `}
      >
           <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-10 py-1 border-b border-blue-600/30">
            <div className="flex items-center gap-3">
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-yellow-400">SK</span>
                <span className="text-blue-300">IDS</span>
                <p className="text-sm font-medium text-white">Information Dissemination</p>
              </span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-6 py-4 border-b border-blue-600/30">
            <div
              className="group cursor-pointer rounded-3xl p-3 transition hover:bg-white/10"
              onClick={() => {
                navigate('/admin/profile');
                onClose && onClose();
              }}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-yellow-400 text-blue-900 grid place-items-center text-base font-bold shadow-lg shadow-yellow-500/30">
                  {displayName.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">{displayRole}</p>
                  <p className="text-sm font-bold text-white truncate">{displayName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact || false}
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-white/20 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }
                `}
                onClick={() => onClose && onClose()}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-5 pb-6 pt-4 border-t border-blue-600/30">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 w-full rounded-3xl border border-blue-500/40 bg-white/10 px-4 py-3 text-sm font-semibold text-blue-200 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <IoLogOutOutline className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
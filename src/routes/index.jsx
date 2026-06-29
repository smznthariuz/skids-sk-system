import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import YouthManagement from '../pages/admin/YouthManagement';
import AdminAnnouncements from '../pages/admin/AdminAnnouncements';
import AdminEvents from '../pages/admin/AdminEvents';
import BudgetManagement from '../pages/admin/BudgetManagement';
import DocumentManagement from '../pages/admin/DocumentManagement';
import Messages from '../pages/admin/Messages';
import HistoryLog from '../pages/admin/HistoryLog';
import AdminProfile from '../pages/admin/AdminProfile';

// User Pages
import UserDashboard from '../pages/user/UserDashboard';
import Announcements from '../pages/user/Announcements';
import EventsCalendar from '../pages/user/EventsCalendar';
import BudgetTransparency from '../pages/user/BudgetTransparency';
import Documents from '../pages/user/Documents';
import UserMessages from '../pages/user/UserMessages';
import UserProfile from '../pages/user/UserProfile';

const isAdmin = true;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="youth" element={<YouthManagement />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="budget" element={<BudgetManagement />} />
        <Route path="documents" element={<DocumentManagement />} />
        <Route path="messages" element={<Messages />} />
        <Route path="history" element={<HistoryLog />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="events" element={<EventsCalendar />} />
        <Route path="budget" element={<BudgetTransparency />} />
        <Route path="documents" element={<Documents />} />
        <Route path="messages" element={<UserMessages />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={isAdmin ? '/admin' : '/user'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
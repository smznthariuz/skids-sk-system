import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PublicRoute from '../components/common/PublicRoute';

// Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const YouthManagement = lazy(() => import('../pages/admin/YouthManagement'));
const AdminAnnouncements = lazy(() => import('../pages/admin/AdminAnnouncements'));
const AdminEvents = lazy(() => import('../pages/admin/AdminEvents'));
const BudgetManagement = lazy(() => import('../pages/admin/BudgetManagement'));
const DocumentManagement = lazy(() => import('../pages/admin/DocumentManagement'));
const Messages = lazy(() => import('../pages/admin/Messages'));
const HistoryLog = lazy(() => import('../pages/admin/HistoryLog'));
const AdminProfile = lazy(() => import('../pages/admin/AdminProfile'));
const YouthProfileView = lazy(() => import('../pages/admin/YouthProfileView'));

// User Pages
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const Announcements = lazy(() => import('../pages/user/Announcements'));
const EventsCalendar = lazy(() => import('../pages/user/EventsCalendar'));
const BudgetTransparency = lazy(() => import('../pages/user/BudgetTransparency'));
const Documents = lazy(() => import('../pages/user/Documents'));
const UserMessages = lazy(() => import('../pages/user/UserMessages'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));

// Public Pages
const Login = lazy(() => import('../pages/public/Login'));
const UserLogin = lazy(() => import('../pages/public/UserLogin'));
const OfficerLogin = lazy(() => import('../pages/public/OfficerLogin'));
const Register = lazy(() => import('../pages/public/Register'));
const TermsAndCondition = lazy(() => import('../pages/public/TermsAndCondition'));
const YouthProfileForm = lazy(() => import('../pages/public/YouthProfileForm'));
const CreateAccountCredentials = lazy(() => import('../pages/public/CreateAccountCredentials'));
const AccountCreated = lazy(() => import('../pages/public/AccountCreated'));
const ForgotPassword = lazy(() => import('../pages/public/ForgotPassword'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-600">Loading...</div>}>
      <Routes>
      {/* Public Routes - No authentication required */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/officer-login" element={<OfficerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/youth-profile" element={<YouthProfileForm />} />
        <Route path="/create-credentials" element={<CreateAccountCredentials />} />
        <Route path="/account-created" element={<AccountCreated />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Admin Routes - Requires authentication and admin role */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="youth" element={<YouthManagement />} />
          <Route path="youth/:id/profile" element={<YouthProfileView />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="budget" element={<BudgetManagement />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="messages" element={<Messages />} />
          <Route path="history" element={<HistoryLog />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Route>

      {/* User Routes - Requires authentication and user role */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="events" element={<EventsCalendar />} />
          <Route path="budget" element={<BudgetTransparency />} />
          <Route path="documents" element={<Documents />} />
          <Route path="messages" element={<UserMessages />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Route>

      {/* Catch-all routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gray-50">
      <div className="lg:hidden">
        <Navbar
          title="SKIDS"
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          role="user"
        />
      </div>

      <div className="flex h-full">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          role="user"
        />
        
        <main className="flex-1 p-4 pt-20 lg:p-8 lg:pt-8 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

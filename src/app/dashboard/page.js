/**
 * Dashboard Page
 * Main landing page after successful login for the Konimex Business Trip Management System
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiCalendar, FiTruck, FiMapPin, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { authAPI } from '@/utils/api';
import AppLayout from '@/components/layout/AppLayout';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  /**
   * Fetch current user data on component mount
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is authenticated
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      } catch (error) {
        // Redirect to login if not authenticated
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
  
  // Menu items for the dashboard
  const menuItems = [
    { icon: <FiUser size={20} />, title: 'Master Data', description: 'Manage branches, roles, employees', path: '/master' },
    { icon: <FiCalendar size={20} />, title: 'Trip Requests', description: 'Manage domestic & international trips', path: '/trips' },
    { icon: <FiTruck size={20} />, title: 'Driver Schedule', description: 'Manage driver assignments', path: '/drivers' },
    { icon: <FiMapPin size={20} />, title: 'Accommodation', description: 'Manage hotels and lodging', path: '/accommodation' },
    { icon: <FiUsers size={20} />, title: 'Mess Requests', description: 'Manage company housing requests', path: '/mess' },
    { icon: <FiFileText size={20} />, title: 'Reports', description: 'View and generate reports', path: '/reports' },
    { icon: <FiSettings size={20} />, title: 'Settings', description: 'Configure system settings', path: '/settings' },
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <AppLayout>
      {/* Welcome message */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">
          This is your dashboard for the Konimex Business Trip Management System. 
          Use the cards below to navigate to different sections of the application.
        </p>
      </div>
      
      {/* Menu grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            onClick={() => router.push(item.path)}
            className="bg-white rounded-lg shadow p-6 flex items-start space-x-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
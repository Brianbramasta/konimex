/**
 * AppLayout Component
 * Main layout wrapper for authenticated pages that includes TopBar and Sidebar
 * Provides consistent layout and navigation across the application
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { authAPI } from '@/utils/api';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  /**
   * Check authentication status on component mount
   * Redirect to login page if user is not authenticated
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify that user is authenticated
        await authAPI.getCurrentUser();
        setLoading(false);
      } catch (error) {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <TopBar />
      
      {/* Sidebar navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="pt-16 md:pl-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
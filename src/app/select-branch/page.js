/**
 * Select Branch Page
 * Allows users with access to multiple branches to select which branch to work with
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { authAPI, branchAPI } from '@/utils/api';

export default function SelectBranchPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  /**
   * Fetch user data and available branches on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is authenticated
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
        
        // Check if user has multiple branches
        if (userData.branches.length <= 1) {
          // If user only has one branch, redirect to dashboard
          router.push('/dashboard');
          return;
        }
        
        // Fetch branches data
        const branchesData = await branchAPI.getBranchesByUserId(userData.id);
        setBranches(branchesData);
      } catch (error) {
        setError(error.message || 'Failed to load data. Please try again.');
        // Redirect to login if not authenticated
        if (error.message === 'Not authenticated') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [router]);
  
  /**
   * Handle branch selection
   * @param {number} branchId - Selected branch ID
   */
  const handleSelectBranch = (branchId) => {
    // Store selected branch in localStorage
    localStorage.setItem('selectedBranch', branchId);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };
  
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <FiMapPin size={32} />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Select Branch</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose which branch you want to work with
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        <div className="mt-8 space-y-4">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => handleSelectBranch(branch.id)}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiMapPin className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-500">{branch.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
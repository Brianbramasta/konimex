/**
 * TopBar Component
 * Fixed position top navigation bar that displays user information, active branch,
 * branch selection dropdown, and logout option
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiChevronDown, FiLogOut, FiMapPin } from 'react-icons/fi';
import { authAPI, branchAPI } from '@/utils/api';

const TopBar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Fetch user data and active branch on component mount
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user data
        const userData = await authAPI.getCurrentUser();
        setUser(userData);

        // Get user's branches
        const branchesData = await branchAPI.getBranchesByUserId(userData.id);
        setBranches(branchesData);

        // Get active branch from localStorage or use the first branch
        const activeBranchId = localStorage.getItem('activeBranchId');
        if (activeBranchId) {
          const branch = branchesData.find(b => b.id === parseInt(activeBranchId));
          if (branch) {
            setActiveBranch(branch);
          } else {
            // If stored branch ID is not valid, use first branch
            setActiveBranch(branchesData[0]);
            localStorage.setItem('activeBranchId', branchesData[0].id.toString());
          }
        } else if (branchesData.length > 0) {
          // If no active branch in storage, use first branch
          setActiveBranch(branchesData[0]);
          localStorage.setItem('activeBranchId', branchesData[0].id.toString());
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle branch change
   * @param {Object} branch - The selected branch
   */
  const handleBranchChange = (branch) => {
    setActiveBranch(branch);
    localStorage.setItem('activeBranchId', branch.id.toString());
    setDropdownOpen(false);
    // Refresh the page to update data based on new branch
    window.location.reload();
  };

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('activeBranchId');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If user data is not loaded yet, show nothing
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 flex items-center justify-between">
      {/* User info and active branch */}
      <div className="flex items-center">
        <div className="flex items-center mr-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            <FiUser className="text-blue-600" />
          </div>
          <span className="font-medium">{user.name}</span>
        </div>

        {activeBranch && (
          <div className="flex items-center text-gray-600">
            <FiMapPin className="mr-1" />
            <span>{activeBranch.name}</span>
          </div>
        )}
      </div>

      {/* Branch selection and logout */}
      <div className="flex items-center">
        {/* Branch dropdown - only show if user has access to multiple branches */}
        {branches.length > 1 && (
          <div className="relative mr-4" ref={dropdownRef}>
            <button
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="mr-1">Change Branch</span>
              <FiChevronDown />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    className={`block w-full text-left px-4 py-2 text-sm ${activeBranch?.id === branch.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => handleBranchChange(branch)}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Logout button */}
        <button
          className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md hover:bg-gray-100"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
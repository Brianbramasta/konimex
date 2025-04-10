'use client';

import { useState } from 'react';
import BranchList from '@/components/master/branch/BranchList';
import BranchForm from '@/components/master/branch/BranchForm';

// Dummy data for initial development
const dummyBranches = [
  { id: 1, code: 'JKT', name: 'Jakarta', status: true },
  { id: 2, code: 'SBY', name: 'Surabaya', status: true },
  { id: 3, code: 'BDG', name: 'Bandung', status: false },
];

/**
 * BranchPage component handles the main branch management interface
 * It manages the state for branch list, form visibility, and selected branch
 */
export default function BranchPage() {
  // State for managing branch data and UI
  const [branches, setBranches] = useState(dummyBranches);
  const [showForm, setShowForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  /**
   * Handles branch creation and updates
   * @param {Object} branchData - The branch data to be saved
   */
  const handleSaveBranch = async (branchData) => {
    try {
      if (selectedBranch) {
        // Update existing branch (dummy implementation)
        const updatedBranches = branches.map(branch =>
          branch.id === selectedBranch.id ? { ...branch, ...branchData } : branch
        );
        setBranches(updatedBranches);
      } else {
        // Create new branch (dummy implementation)
        const newBranch = {
          id: branches.length + 1,
          ...branchData
        };
        setBranches([...branches, newBranch]);
      }
      setShowForm(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  /**
   * Handles branch deletion
   * @param {number} branchId - The ID of the branch to delete
   */
  const handleDeleteBranch = async (branchId) => {
    try {
      // Delete branch (dummy implementation)
      const updatedBranches = branches.filter(branch => branch.id !== branchId);
      setBranches(updatedBranches);
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  /**
   * Filters branches based on search query and status filter
   * @returns {Array} Filtered branches array
   */
  const getFilteredBranches = () => {
    return branches.filter(branch => {
      const matchesSearch = 
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'active' && branch.status) ||
        (filterStatus === 'inactive' && !branch.status);
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Branch Management</h1>
      
      <BranchList
        branches={getFilteredBranches()}
        onEdit={(branch) => {
          setSelectedBranch(branch);
          setShowForm(true);
        }}
        onDelete={handleDeleteBranch}
        onAdd={() => {
          setSelectedBranch(null);
          setShowForm(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {showForm && (
        <BranchForm
          branch={selectedBranch}
          onSave={handleSaveBranch}
          onCancel={() => {
            setShowForm(false);
            setSelectedBranch(null);
          }}
          branches={branches} // For code uniqueness validation
        />
      )}
    </div>
  );
}
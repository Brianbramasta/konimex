'use client';

import { useState } from 'react';
import RoleList from '@/components/master/role/RoleList';
import RoleForm from '@/components/master/role/RoleForm';

// Dummy data for initial development
const dummyRoles = [
  { id: 1, code: 'ADMIN', name: 'Administrator', status: true },
  { id: 2, code: 'MGR', name: 'Manager', status: true },
  { id: 3, code: 'USR', name: 'User', status: false },
];

/**
 * RolePage component handles the main role management interface
 * It manages the state for role list, form visibility, and selected role
 */
export default function RolePage() {
  // State for managing role data and UI
  const [roles, setRoles] = useState(dummyRoles);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  /**
   * Handles role creation and updates
   * @param {Object} roleData - The role data to be saved
   */
  const handleSaveRole = async (roleData) => {
    try {
      if (selectedRole) {
        // Update existing role (dummy implementation)
        const updatedRoles = roles.map(role =>
          role.id === selectedRole.id ? { ...role, ...roleData } : role
        );
        setRoles(updatedRoles);
      } else {
        // Create new role (dummy implementation)
        const newRole = {
          id: roles.length + 1,
          ...roleData
        };
        setRoles([...roles, newRole]);
      }
      setShowForm(false);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  /**
   * Handles role deletion
   * @param {number} roleId - The ID of the role to delete
   */
  const handleDeleteRole = async (roleId) => {
    try {
      // Delete role (dummy implementation)
      const updatedRoles = roles.filter(role => role.id !== roleId);
      setRoles(updatedRoles);
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  /**
   * Filters roles based on search query and status filter
   * @returns {Array} Filtered roles array
   */
  const getFilteredRoles = () => {
    return roles.filter(role => {
      const matchesSearch = 
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'active' && role.status) ||
        (filterStatus === 'inactive' && !role.status);
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Role Management</h1>
      
      <RoleList
        roles={getFilteredRoles()}
        onEdit={(role) => {
          setSelectedRole(role);
          setShowForm(true);
        }}
        onDelete={handleDeleteRole}
        onAdd={() => {
          setSelectedRole(null);
          setShowForm(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {showForm && (
        <RoleForm
          role={selectedRole}
          onSave={handleSaveRole}
          onCancel={() => {
            setShowForm(false);
            setSelectedRole(null);
          }}
          roles={roles} // For code uniqueness validation
        />
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Table, Input, Button, Space, Tag, Modal } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import RoleForm from './RoleForm';

// Dummy data for initial development
const dummyRoles = [
  {
    id: 1,
    name: 'Admin',
    isActive: true,
    permissions: {
      orders: {
        costInput: true,
        approvalDN: true,
        approvalLN: true
      }
    }
  },
  {
    id: 2,
    name: 'Manager',
    isActive: true,
    permissions: {
      orders: {
        costInput: true,
        approvalDN: true,
        approvalLN: false
      }
    }
  }
];

/**
 * RoleList Component
 * Displays a list of roles with search and filter functionality
 * @returns {JSX.Element} The rendered role list component
 */
const RoleList = () => {
  // State for search text and filtered data
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(dummyRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Table columns configuration
  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Order Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => (
        <Space direction="vertical">
          <Tag color={permissions.orders.costInput ? 'blue' : 'gray'}>
            Cost Input
          </Tag>
          <Tag color={permissions.orders.approvalDN ? 'blue' : 'gray'}>
            DN Approval
          </Tag>
          <Tag color={permissions.orders.approvalLN ? 'blue' : 'gray'}>
            LN Approval
          </Tag>
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      )
    }
  ];

  // Handler for edit button click
  const handleEdit = (record) => {
    setEditingRole(record);
    setIsModalOpen(true);
  };

  // Handler for delete button click
  const handleDelete = (record) => {
    // Implement delete confirmation and API call here
    const newData = data.filter(item => item.id !== record.id);
    setData(newData);
  };

  // Handler for add new role button click
  const handleAddNew = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingRole) {
        // Update existing role
        const newData = data.map(item =>
          item.id === editingRole.id ? { ...values, id: item.id } : item
        );
        setData(newData);
      } else {
        // Add new role
        const newRole = {
          ...values,
          id: Math.max(...data.map(r => r.id)) + 1
        };
        setData([...data, newRole]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search roles"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddNew}
        >
          Add Role
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        className="w-full"
        pagination={{
          pageSize: 10,
          responsive: true
        }}
      />
      <Modal
        title={editingRole ? 'Edit Role' : 'Add New Role'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <RoleForm
          initialData={editingRole}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
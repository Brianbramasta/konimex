'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Switch, Card, Button, Space, Checkbox } from 'antd';

/**
 * RoleForm Component
 * Form for creating and editing roles with permission settings
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial role data for editing (optional)
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {Function} props.onCancel - Function to handle form cancellation
 * @returns {JSX.Element} The rendered role form component
 */
const RoleForm = ({ initialData, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set initial form values when editing
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        isActive: initialData.isActive,
        'permissions.orders.costInput': initialData.permissions?.orders?.costInput,
        'permissions.orders.approvalDN': initialData.permissions?.orders?.approvalDN,
        'permissions.orders.approvalLN': initialData.permissions?.orders?.approvalLN
      });
    }
  }, [initialData, form]);

  /**
   * Handles form submission
   * @param {Object} values - Form values
   */
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Transform form values to match API structure
      const formattedData = {
        name: values.name,
        isActive: values.isActive,
        permissions: {
          orders: {
            costInput: values['permissions.orders.costInput'],
            approvalDN: values['permissions.orders.approvalDN'],
            approvalLN: values['permissions.orders.approvalLN']
          }
        }
      };
      
      // Here we would make the API call
      // For now, we'll just pass the data to the parent
      await onSubmit(formattedData);
    } catch (error) {
      console.error('Error submitting role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        isActive: true,
        'permissions.orders.costInput': false,
        'permissions.orders.approvalDN': false,
        'permissions.orders.approvalLN': false
      }}
      className="max-w-2xl mx-auto"
    >
      <Card className="mb-4">
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: 'Please input the role name!' }]}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="isActive"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Card>

      <Card title="Order Permissions" className="mb-4">
        <Form.Item
          name="permissions.orders.costInput"
          valuePropName="checked"
        >
          <Checkbox>Cost Input Permission</Checkbox>
        </Form.Item>

        <Form.Item
          name="permissions.orders.approvalDN"
          valuePropName="checked"
        >
          <Checkbox>Domestic Order (DN) Approval Permission</Checkbox>
        </Form.Item>

        <Form.Item
          name="permissions.orders.approvalLN"
          valuePropName="checked"
        >
          <Checkbox>International Order (LN) Approval Permission</Checkbox>
        </Form.Item>
      </Card>

      <div className="flex justify-end gap-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialData ? 'Update' : 'Create'} Role
        </Button>
      </div>
    </Form>
  );
};

export default RoleForm;
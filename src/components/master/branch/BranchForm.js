'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

/**
 * BranchForm component handles the creation and editing of branches
 * @param {Object} props - Component props
 * @param {Object} props.branch - Branch object for editing (null for new branch)
 * @param {Function} props.onSave - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when form is cancelled
 * @param {Array} props.branches - Array of existing branches for code validation
 */
export default function BranchForm({ branch, onSave, onCancel, branches }) {
  // Form state
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    status: true
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (branch) {
      setFormData({
        code: branch.code,
        name: branch.name,
        status: branch.status
      });
    }
  }, [branch]);

  /**
   * Validates the form data
   * @returns {boolean} True if validation passes
   */
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.code.trim()) {
      newErrors.code = 'Branch code is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Branch name is required';
    }

    // Code format validation (alphanumeric, max 5 chars)
    if (formData.code && !/^[A-Za-z0-9]{1,5}$/.test(formData.code)) {
      newErrors.code = 'Code must be 1-5 alphanumeric characters';
    }

    // Code uniqueness validation
    const existingBranch = branches.find(
      b => b.code.toLowerCase() === formData.code.toLowerCase() && 
      (!branch || b.id !== branch.id)
    );
    if (existingBranch) {
      newErrors.code = 'Branch code must be unique';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        await onSave({
          ...formData,
          code: formData.code.toUpperCase()
        });
      }
    } catch (error) {
      console.error('Error saving branch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {branch ? 'Edit Branch' : 'Add New Branch'}
      </h2>

      <div className="space-y-4">
        {/* Branch Code */}
        <div className="space-y-2">
          <Label htmlFor="code">Branch Code</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            maxLength={5}
            className={errors.code ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code}</p>
          )}
        </div>

        {/* Branch Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Branch Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Branch Status */}
        <div className="flex items-center space-x-2">
          <Switch
            id="status"
            checked={formData.status}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, status: checked })
            }
            disabled={isSubmitting}
          />
          <Label htmlFor="status">Active</Label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Branch'}
        </Button>
      </div>
    </form>
  );
}
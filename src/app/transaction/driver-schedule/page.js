'use client';

import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import DriverScheduleList from '@/components/driver-schedule/DriverScheduleList';
import DriverScheduleCalendar from '@/components/driver-schedule/DriverScheduleCalendar';
import DigitalPass from '@/components/driver-schedule/DigitalPass';

// Dummy data for initial development
const dummySchedules = [
  {
    id: 1,
    driverId: 1,
    driverName: 'John Doe',
    orderNumber: 'ORD001',
    pickupLocation: 'Office HQ',
    pickupTime: '2025-04-20T08:00:00',
    dropLocation: 'Airport Terminal 2',
    dropTime: '2025-04-20T10:00:00',
    status: 'Pending', // Pending, Departed, Arrived
    pickupMapsLink: 'https://maps.google.com/?q=-6.2088,106.8456',
    dropMapsLink: 'https://maps.google.com/?q=-6.1258,106.6535',
    departureTime: null,
    arrivalTime: null
  },
  // Add more dummy schedules as needed
];

/**
 * DriverSchedulePage component handles the main driver scheduling interface
 * It includes list view, calendar view, and digital pass management
 */
export default function DriverSchedulePage() {
  // State for managing active tab and schedule data
  const [activeTab, setActiveTab] = useState(0);
  const [schedules, setSchedules] = useState(dummySchedules);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  /**
   * Handles tab change between list and calendar views
   * @param {Object} event - The event object
   * @param {number} newValue - The index of the selected tab
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  /**
   * Updates the status of a schedule (Departed/Arrived)
   * @param {number} scheduleId - The ID of the schedule to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusUpdate = async (scheduleId, newStatus) => {
    try {
      // In real implementation, this would be an API call
      const updatedSchedules = schedules.map(schedule => {
        if (schedule.id === scheduleId) {
          const now = new Date().toISOString();
          return {
            ...schedule,
            status: newStatus,
            departureTime: newStatus === 'Departed' ? now : schedule.departureTime,
            arrivalTime: newStatus === 'Arrived' ? now : schedule.arrivalTime
          };
        }
        return schedule;
      });
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error('Error updating schedule status:', error);
    }
  };

  /**
   * Handles driver selection for filtering schedules
   * @param {number|null} driverId - The ID of the selected driver
   */
  const handleDriverSelect = (driverId) => {
    setSelectedDriver(driverId);
  };

  /**
   * Filters schedules based on selected driver
   * @returns {Array} Filtered schedules array
   */
  const getFilteredSchedules = () => {
    if (!selectedDriver) return schedules;
    return schedules.filter(schedule => schedule.driverId === selectedDriver);
  };

  return (
    <Box className="p-4 space-y-4">
      <Typography variant="h4" component="h1" className="mb-4">
        Driver Schedule Management
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} className="mb-4">
        <Tab label="List View" />
        <Tab label="Calendar View" />
        <Tab label="Digital Pass" />
      </Tabs>

      {activeTab === 0 && (
        <DriverScheduleList
          schedules={getFilteredSchedules()}
          onStatusUpdate={handleStatusUpdate}
          onDriverSelect={handleDriverSelect}
          selectedDriver={selectedDriver}
        />
      )}

      {activeTab === 1 && (
        <DriverScheduleCalendar
          schedules={getFilteredSchedules()}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onStatusUpdate={handleStatusUpdate}
          onDriverSelect={handleDriverSelect}
          selectedDriver={selectedDriver}
        />
      )}

      {activeTab === 2 && (
        <DigitalPass
          schedules={getFilteredSchedules()}
        />
      )}
    </Box>
  );
}
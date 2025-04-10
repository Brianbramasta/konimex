'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Typography,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';

// Dummy data for drivers (in real app, this would come from an API)
const dummyDrivers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

/**
 * DriverScheduleList component displays a list of driver schedules with filtering and status management
 * @param {Object} props - Component props
 * @param {Array} props.schedules - Array of schedule objects
 * @param {Function} props.onStatusUpdate - Callback for updating schedule status
 * @param {Function} props.onDriverSelect - Callback for driver selection
 * @param {number|null} props.selectedDriver - Currently selected driver ID
 */
export default function DriverScheduleList({ schedules, onStatusUpdate, onDriverSelect, selectedDriver }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filters schedules based on status and search query
   * @returns {Array} Filtered schedules array
   */
  const getFilteredSchedules = () => {
    return schedules.filter(schedule => {
      const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter;
      const matchesSearch = 
        schedule.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.dropLocation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  /**
   * Formats a date string into a readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box className="space-y-4">
      {/* Filters */}
      <Box className="flex flex-col md:flex-row gap-4 mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <FormControl size="small" className="min-w-[200px]">
          <InputLabel>Driver</InputLabel>
          <Select
            value={selectedDriver || ''}
            onChange={(e) => onDriverSelect(e.target.value || null)}
            label="Driver"
          >
            <MenuItem value="">All Drivers</MenuItem>
            {dummyDrivers.map(driver => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" className="min-w-[150px]">
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Departed">Departed</MenuItem>
            <MenuItem value="Arrived">Arrived</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Schedule List */}
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Drop-off</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredSchedules().map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.orderNumber}</TableCell>
                <TableCell>{schedule.driverName}</TableCell>
                <TableCell>
                  <Typography variant="body2" className="mb-1">
                    {schedule.pickupLocation}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDateTime(schedule.pickupTime)}
                  </Typography>
                  {schedule.pickupMapsLink && (
                    <Link
                      href={schedule.pickupMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center mt-1"
                    >
                      <LaunchIcon fontSize="small" className="mr-1" />
                      Maps
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" className="mb-1">
                    {schedule.dropLocation}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDateTime(schedule.dropTime)}
                  </Typography>
                  {schedule.dropMapsLink && (
                    <Link
                      href={schedule.dropMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center mt-1"
                    >
                      <LaunchIcon fontSize="small" className="mr-1" />
                      Maps
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    className={`inline-block px-2 py-1 rounded-full text-sm ${schedule.status === 'Arrived' ? 'bg-green-100 text-green-800' : schedule.status === 'Departed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {schedule.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {schedule.status === 'Pending' && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onStatusUpdate(schedule.id, 'Departed')}
                    >
                      Start Trip
                    </Button>
                  )}
                  {schedule.status === 'Departed' && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => onStatusUpdate(schedule.id, 'Arrived')}
                    >
                      End Trip
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
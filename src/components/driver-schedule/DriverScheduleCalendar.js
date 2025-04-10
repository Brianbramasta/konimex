'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Dummy data for drivers (in real app, this would come from an API)
const dummyDrivers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

// Setup localizer for the calendar
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

/**
 * DriverScheduleCalendar component displays a calendar view of driver schedules
 * @param {Object} props - Component props
 * @param {Array} props.schedules - Array of schedule objects
 * @param {string} props.viewMode - Calendar view mode (month, week, day)
 * @param {Function} props.onViewModeChange - Callback for changing view mode
 * @param {Function} props.onStatusUpdate - Callback for updating schedule status
 * @param {Function} props.onDriverSelect - Callback for driver selection
 * @param {number|null} props.selectedDriver - Currently selected driver ID
 */
export default function DriverScheduleCalendar({
  schedules,
  viewMode,
  onViewModeChange,
  onStatusUpdate,
  onDriverSelect,
  selectedDriver
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedEvent, setSelectedEvent] = useState(null);

  /**
   * Formats schedule data for calendar display
   * @returns {Array} Formatted events array
   */
  const getCalendarEvents = () => {
    return schedules.map(schedule => ({
      id: schedule.id,
      title: `${schedule.orderNumber} - ${schedule.driverName}`,
      start: new Date(schedule.pickupTime),
      end: new Date(schedule.dropTime),
      resource: schedule,
    }));
  };

  /**
   * Handles event selection in calendar
   * @param {Object} event - Selected calendar event
   */
  const handleEventSelect = (event) => {
    setSelectedEvent(event.resource);
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
      <Box className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && onViewModeChange(newMode)}
          size={isMobile ? 'small' : 'medium'}
        >
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="day">Day</ToggleButton>
        </ToggleButtonGroup>

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
      </Box>

      <Box className="flex flex-col lg:flex-row gap-4">
        <Box className="flex-grow">
          <Calendar
            localizer={localizer}
            events={getCalendarEvents()}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={viewMode}
            onView={onViewModeChange}
            onSelectEvent={handleEventSelect}
            eventPropGetter={(event) => ({
              className: `bg-${event.resource.status === 'Arrived' ? 'green' : event.resource.status === 'Departed' ? 'blue' : 'gray'}-200`,
            })}
          />
        </Box>

        {selectedEvent && (
          <Paper className="p-4 lg:w-80">
            <Typography variant="h6" className="mb-3">
              Schedule Details
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="subtitle2">Order Number</Typography>
                <Typography>{selectedEvent.orderNumber}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Driver</Typography>
                <Typography>{selectedEvent.driverName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Pickup</Typography>
                <Typography>{selectedEvent.pickupLocation}</Typography>
                <Typography variant="caption" display="block">
                  {formatDateTime(selectedEvent.pickupTime)}
                </Typography>
                {selectedEvent.pickupMapsLink && (
                  <Link
                    href={selectedEvent.pickupMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-1"
                  >
                    <LaunchIcon fontSize="small" className="mr-1" />
                    View in Maps
                  </Link>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle2">Drop-off</Typography>
                <Typography>{selectedEvent.dropLocation}</Typography>
                <Typography variant="caption" display="block">
                  {formatDateTime(selectedEvent.dropTime)}
                </Typography>
                {selectedEvent.dropMapsLink && (
                  <Link
                    href={selectedEvent.dropMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-1"
                  >
                    <LaunchIcon fontSize="small" className="mr-1" />
                    View in Maps
                  </Link>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle2">Status</Typography>
                <Typography
                  className={`inline-block px-2 py-1 rounded-full text-sm ${selectedEvent.status === 'Arrived' ? 'bg-green-100 text-green-800' : selectedEvent.status === 'Departed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {selectedEvent.status}
                </Typography>
              </Box>
              {selectedEvent.status === 'Pending' && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => onStatusUpdate(selectedEvent.id, 'Departed')}
                >
                  Start Trip
                </Button>
              )}
              {selectedEvent.status === 'Departed' && (
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => onStatusUpdate(selectedEvent.id, 'Arrived')}
                >
                  End Trip
                </Button>
              )}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
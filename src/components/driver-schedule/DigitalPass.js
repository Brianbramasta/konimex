'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Link,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Launch as LaunchIcon, QrCode2 as QrCodeIcon } from '@mui/icons-material';

/**
 * DigitalPass component displays digital passes for drivers
 * @param {Object} props - Component props
 * @param {Array} props.schedules - Array of schedule objects
 */
export default function DigitalPass({ schedules }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedPass, setSelectedPass] = useState(null);

  /**
   * Formats a date string into a readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  /**
   * Generates a unique pass ID for security verification
   * @param {Object} schedule - Schedule object
   * @returns {string} Unique pass ID
   */
  const generatePassId = (schedule) => {
    return `PASS-${schedule.orderNumber}-${new Date(schedule.pickupTime).getTime()}`;
  };

  /**
   * Handles opening the digital pass dialog
   * @param {Object} schedule - Selected schedule for pass display
   */
  const handleOpenPass = (schedule) => {
    setSelectedPass(schedule);
  };

  /**
   * Handles closing the digital pass dialog
   */
  const handleClosePass = () => {
    setSelectedPass(null);
  };

  return (
    <Box className="space-y-4">
      <Typography variant="h6" className="mb-4">
        Digital Passes
      </Typography>

      <TableContainer component={Paper}>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>Pass ID</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{generatePassId(schedule)}</TableCell>
                <TableCell>{schedule.driverName}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {schedule.orderNumber}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block">
                    {formatDateTime(schedule.pickupTime)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    className={`inline-block px-2 py-1 rounded-full text-sm ${schedule.status === 'Arrived' ? 'bg-green-100 text-green-800' : schedule.status === 'Departed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {schedule.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<QrCodeIcon />}
                    onClick={() => handleOpenPass(schedule)}
                    disabled={schedule.status === 'Arrived'}
                  >
                    View Pass
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={Boolean(selectedPass)}
        onClose={handleClosePass}
        maxWidth="sm"
        fullWidth
      >
        {selectedPass && (
          <>
            <DialogTitle>
              Digital Pass - {selectedPass.orderNumber}
            </DialogTitle>
            <DialogContent>
              <Box className="space-y-4 py-4">
                <Box className="text-center p-6 bg-gray-100 rounded-lg">
                  {/* In a real implementation, this would be an actual QR code */}
                  <QrCodeIcon style={{ fontSize: 120 }} />
                  <Typography variant="body2" className="mt-2">
                    {generatePassId(selectedPass)}
                  </Typography>
                </Box>

                <Box className="space-y-3">
                  <Box>
                    <Typography variant="subtitle2">Driver</Typography>
                    <Typography>{selectedPass.driverName}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Pickup</Typography>
                    <Typography>{selectedPass.pickupLocation}</Typography>
                    <Typography variant="caption" display="block">
                      {formatDateTime(selectedPass.pickupTime)}
                    </Typography>
                    {selectedPass.pickupMapsLink && (
                      <Link
                        href={selectedPass.pickupMapsLink}
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
                    <Typography>{selectedPass.dropLocation}</Typography>
                    <Typography variant="caption" display="block">
                      {formatDateTime(selectedPass.dropTime)}
                    </Typography>
                    {selectedPass.dropMapsLink && (
                      <Link
                        href={selectedPass.dropMapsLink}
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
                      className={`inline-block px-2 py-1 rounded-full text-sm ${selectedPass.status === 'Arrived' ? 'bg-green-100 text-green-800' : selectedPass.status === 'Departed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {selectedPass.status}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="textSecondary" className="text-center mt-4">
                  Show this pass to security before leaving the premises
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePass}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
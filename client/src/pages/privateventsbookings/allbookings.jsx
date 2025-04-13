import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import { Download, PictureAsPdf } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import Sidebar from '../admin/sidebar/sidebar';

const AllPrivateBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/private/my-bookings/${user._id}`);
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatedBookings = bookings.map(b =>
      b._id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updatedBookings);

    await fetch(`http://localhost:4000/api/private/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Confirmed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookings.map(b => ({
      BookingDate: b.bookingDate,
      Status: b.status,
      PaymentMethod: b.payment?.method || '',
      Amount: b.payment?.amount || 0,
      PaymentStatus: b.payment?.status || '',
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    XLSX.writeFile(workbook, 'MyBookings.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    bookings.forEach((b, index) => {
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(10, y, 190, 60, 5, 5, 'F');
      doc.setFontSize(12);
      doc.text(`Booking #${index + 1}`, 15, y + 10);
      doc.text(`Date: ${new Date(b.bookingDate).toLocaleDateString()}`, 15, y + 20);
      doc.text(`Status: ${b.status}`, 15, y + 30);
      doc.text(`Payment Method: ${b.payment?.method || 'N/A'}`, 15, y + 40);
      doc.text(`Amount: ₹${b.payment?.amount || 0}`, 15, y + 50);
      doc.text(`Payment Status: ${b.payment?.status || 'N/A'}`, 15, y + 60);

      y += 70;
      if (y > 250) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('MyBookings.pdf');
  };

  // 🧠 Filter logic
  const filteredBookings = bookings.filter((b) =>
    (b.payment?.method?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
    (filterStatus ? b.status === filterStatus : true) &&
    (filterPaymentStatus ? b.payment?.status === filterPaymentStatus : true)
  );

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
    <Sidebar/>
   <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"100px"}}>
   <Box p={4}>
      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center" color="primary">
        All Bookings
      </Typography>

      {/* 🔍 Search and Filter Inputs */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" mb={3}>
        <TextField
          label="Search by Payment Method"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          displayEmpty
          size="small"
        >
          <MenuItem value="">All Booking Status</MenuItem>
          {['Pending', 'Confirmed', 'Cancelled'].map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
        <Select
          value={filterPaymentStatus}
          onChange={(e) => setFilterPaymentStatus(e.target.value)}
          displayEmpty
          size="small"
        >
          <MenuItem value="">All Payment Status</MenuItem>
          {['Paid', 'Unpaid', 'Refunded'].map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button variant="contained" color="success" startIcon={<Download />} onClick={exportToExcel}>
          Export to Excel
        </Button>
        <Button variant="contained" color="error" startIcon={<PictureAsPdf />} onClick={exportToPDF}>
          Export to PDF
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Payment Method</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Payment Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{new Date(b.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    >
                      {['Pending', 'Confirmed', 'Cancelled'].map((status) => (
                        <MenuItem key={status} value={status}>
                          <Chip label={status} color={getStatusColor(status)} size="small" />
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{b.payment?.method || 'N/A'}</TableCell>
                  <TableCell>₹{b.payment?.amount || 0}</TableCell>
                  <TableCell>{b.payment?.status || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No bookings found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
   </div>
    </>
  );
};

export default AllPrivateBookings;

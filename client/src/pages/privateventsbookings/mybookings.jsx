import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Slide
} from '@mui/material';
import { Download, PictureAsPdf } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const MyPrivateBookings = () => {

const user=JSON.parse(localStorage.getItem("user"))
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center" color="primary">My Bookings</Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <Button variant="contained" color="success" startIcon={<Download />} onClick={exportToExcel}>
          Export to Excel
        </Button>
        <Button variant="contained" color="error" startIcon={<PictureAsPdf />} onClick={exportToPDF}>
          Export to PDF
        </Button>
      </Box>

      <Grid container spacing={3}>
        {bookings.map((booking, index) => (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index}>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={6} sx={{ borderRadius: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Booking #{index + 1}
                  </Typography>
                  <Typography>Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                  <Typography>Status: {booking.status}</Typography>
                  <Typography>Payment Method: {booking.payment?.method || 'N/A'}</Typography>
                  <Typography>Amount: ₹{booking.payment?.amount || 0}</Typography>
                  <Typography>Payment Status: {booking.payment?.status || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPrivateBookings;

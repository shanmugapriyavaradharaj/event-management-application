import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Grid, CircularProgress,
  Slide, CardMedia, CardActions, Chip, Rating, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { Download, PictureAsPdf, Feedback as FeedbackIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import Carousel from 'react-material-ui-carousel';

const MyPrivateBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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

  const handleOpenFeedback = (bookingId) => {
    setSelectedBookingId(bookingId);
    setRating(0);
    setComment('');
    setOpenFeedback(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBookingId,
          userId: user._id,
          rating,
          comment,
        })
      });

      const result = await res.json();
      if (res.ok) {
        alert('Feedback submitted successfully!');
        setOpenFeedback(false);
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
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

  const downloadPDF = (booking, index) => {
    const doc = new jsPDF();
    doc.text(`Booking #${index + 1}`, 10, 10);
    doc.text(`Date: ${new Date(booking.bookingDate).toLocaleDateString()}`, 10, 20);
    doc.text(`Status: ${booking.status}`, 10, 30);
    doc.text(`Payment Method: ${booking.payment?.method || 'N/A'}`, 10, 40);
    doc.text(`Amount: ₹${booking.payment?.amount || 0}`, 10, 50);
    doc.text(`Payment Status: ${booking.payment?.status || 'N/A'}`, 10, 60);
    doc.text(`Venue: ${booking.venue?.venueName || 'N/A'} - ${booking.venue?.location || ''}`, 10, 70);
    doc.text(`Accommodation: ${booking.accommodation?.hotelName || 'N/A'} (${booking.accommodation?.roomType || ''})`, 10, 80);
    doc.text(`Transport: ${booking.transportation?.transportType || 'N/A'} (${booking.transportation?.category || ''})`, 10, 90);
    doc.save(`Booking_${index + 1}.pdf`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'paid': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box p={6}>
      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center" color="primary">My Bookings</Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button variant="contained" color="success" startIcon={<Download />} onClick={exportToExcel}>
          Export All to Excel
        </Button>
      </Box>

      <Grid container spacing={2}>
        {bookings.map((booking, index) => (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={6} sx={{
                borderRadius: 3,
                transition: '0.3s',
                bgcolor: '#fff5f8',
                p: 1,
                '&:hover': { transform: 'scale(1.02)' }
              }}>
                <Carousel autoPlay={false} navButtonsAlwaysVisible indicators={false}>
                  {[...booking.eventType.images, ...booking.venue.images].map((img, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      height="80"
                      image={img.replace('\\', '/')}
                      alt={`image-${i}`}
                      sx={{ objectFit: 'cover', borderRadius: 2, p: 1 }}
                    />
                  ))}
                </Carousel>
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Booking #{index + 1}</Typography>
                  <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                  <Chip label={booking.status} color={getStatusColor(booking.status)} variant="outlined" size="small" sx={{ mt: 1 }} />

                  <Box mt={1}>
                    <Typography variant="caption" fontWeight="bold">Payment</Typography>
                    <Typography variant="body2">Method: {booking.payment?.method || 'N/A'}</Typography>
                    <Typography variant="body2">Amount: ₹{booking.payment?.amount || 0}</Typography>
                    <Typography variant="body2">Status: {booking.payment?.status || 'N/A'}</Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="caption" fontWeight="bold">Venue</Typography>
                    <Typography variant="body2">Name: {booking.venue?.venueName}</Typography>
                    <Typography variant="body2">Location: {booking.venue?.location}</Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="caption" fontWeight="bold">Accommodation</Typography>
                    <Typography variant="body2">Hotel: {booking.accommodation?.hotelName}</Typography>
                    <Typography variant="body2">Type: {booking.accommodation?.roomType}</Typography>
                    <Typography variant="body2">Duration: {booking.accommodation?.stayDuration} days</Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="caption" fontWeight="bold">Transportation</Typography>
                    <Typography variant="body2">Type: {booking.transportation?.transportType}</Typography>
                    <Typography variant="body2">Distance: {booking.transportation?.distance} km</Typography>
                    <Typography variant="body2">Category: {booking.transportation?.category}</Typography>
                    <Typography variant="body2">Price: ₹{booking.transportation?.price}</Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="outlined" size="small" color="error" startIcon={<PictureAsPdf />} onClick={() => downloadPDF(booking, index)}>
                    Download PDF
                  </Button>
                  <Button variant="contained" size="small" color="primary" startIcon={<FeedbackIcon />} onClick={() => handleOpenFeedback(booking._id)}>
                    Give Feedback
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Rate Your Experience</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Rating:</Typography>
          <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPrivateBookings;

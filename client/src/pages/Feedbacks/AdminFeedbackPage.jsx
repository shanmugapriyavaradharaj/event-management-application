import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, Divider } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Sidebar from '../admin/sidebar/sidebar';

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from the API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/feedback');
        setFeedbacks(response.data); // Store the feedback data in state
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPosition = 10; // Initial y position for text
  
    feedbacks.forEach((feedback, index) => {
      if (index > 0) {
        doc.addPage(); // Add a new page for every new feedback
        yPosition = 10; // Reset y-position when starting a new page
      }
  
      // Feedback Title
      doc.setFontSize(12);
      doc.text(`Feedback #${index + 1}`, 10, yPosition);
      yPosition += 10;
  
      // User Details
      doc.text(`User ID: ${feedback.userId._id}`, 10, yPosition);
      yPosition += 10;
      doc.text(`User Name: ${feedback.userId.name}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Email: ${feedback.userId.email}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Rating: ${feedback.rating}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Comment: ${feedback.comment}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Created At: ${new Date(feedback.createdAt).toLocaleString()}`, 10, yPosition);
      yPosition += 10;
  
      // Booking details
      if (feedback.bookingId) {
        doc.text(`Booking ID: ${feedback.bookingId._id}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Payment Method: ${feedback.bookingId.payment.method}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Transaction ID: ${feedback.bookingId.payment.transactionId}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Amount: ₹${feedback.bookingId.payment.amount}`, 10, yPosition);
        yPosition += 10;
      }
  
      // Check if the content is overflowing the page length
      if (yPosition > 270) { // Page length is approximately 290 with margins
        doc.addPage(); // Add a new page if the content is too long
        yPosition = 10; // Reset y-position
      }
    });
  
    doc.save('feedbacks.pdf');
  };
  

  // Export to Excel function
  const exportToExcel = () => {
    const data = feedbacks.map(feedback => ({
      'User ID': feedback.userId._id,
      User: feedback.userId.name,
      Email: feedback.userId.email,
      Rating: feedback.rating,
      Comment: feedback.comment,
      'Created At': new Date(feedback.createdAt).toLocaleString(),
      'Booking ID': feedback.bookingId ? feedback.bookingId._id : 'N/A',
      'Payment Method': feedback.bookingId ? feedback.bookingId.payment.method : 'N/A',
      'Transaction ID': feedback.bookingId ? feedback.bookingId.payment.transactionId : 'N/A',
      'Amount': feedback.bookingId ? `₹${feedback.bookingId.payment.amount}` : 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feedbacks');
    XLSX.writeFile(wb, 'feedbacks.xlsx');
  };

  return (

    <>
     <Sidebar/>
     <Box sx={{ padding: 4 ,marginLeft: 50 }}>
      <Typography variant="h4" gutterBottom>
        Feedbacks
      </Typography>
      <Grid container spacing={3}>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Grid item xs={12} sm={6} md={4} key={feedback._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">User: {feedback.userId.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>User ID:</strong> {feedback.userId._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {feedback.userId.email}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    <strong>Rating:</strong> {feedback.rating}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    <strong>Comment:</strong> {feedback.comment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    <strong>Created At:</strong> {new Date(feedback.createdAt).toLocaleString()}
                  </Typography>
                  {feedback.bookingId && (
                    <Box sx={{ marginTop: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Booking ID:</strong> {feedback.bookingId._id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Payment Method:</strong> {feedback.bookingId.payment.method}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Transaction ID:</strong> {feedback.bookingId.payment.transactionId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Amount:</strong> ₹{feedback.bookingId.payment.amount}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Divider sx={{ marginTop: 2 }} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No feedback available</Typography>
        )}
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={exportToPDF}
          sx={{ marginRight: 2 }}
        >
          Export to PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>
    </Box>
    </>
   
  );
};

export default AdminFeedbackPage;

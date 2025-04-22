import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";

const statusColors = {
  Confirmed: "linear-gradient(135deg, #4CAF50, #81C784)",
  Pending: "linear-gradient(135deg, #FF9800, #FFB74D)",
  Canceled: "linear-gradient(135deg, #F44336, #E57373)",
};

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    // Fetch bookings for the user
    axios
      .get(`http://localhost:4000/api/bookings/my/${user.email}`)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));

    // Fetch ratings and feedback for each booking
    bookings.forEach((booking) => {
      axios
        .get(`http://localhost:4000/api/feedback/${booking._id}`)
        .then((response) => {
          setFeedbackData((prev) => ({
            ...prev,
            [booking._id]: response.data,
          }));
        })
        .catch((error) => console.error("Error fetching rating:", error));
    });
  }, []);

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  const handleFeedbackChange = (bookingId, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value,
      },
    }));
  };

  const handleSubmitFeedback = async (bookingId) => {
    const { feedback, rating } = feedbackData[bookingId] || {};

    if (!feedback || !rating) {
      alert("Please provide both rating and feedback.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/feedback", {
        bookingId,
        userId: user._id,
        feedback,
        rating,
      });

      alert("Feedback submitted!");
      // Update UI
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, feedback, rating } : b
        )
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("My Bookings", 14, y);
    y += 10;

    bookings.forEach((booking, index) => {
      doc.setFontSize(12);
      doc.text(`Booking ${index + 1}`, 14, y);
      y += 7;
      doc.text(`Customer Name: ${booking.customerName}`, 14, y);
      y += 6;
      doc.text(`Email: ${booking.customerEmail}`, 14, y);
      y += 6;
      doc.text(`Phone: ${booking.customerPhone}`, 14, y);
      y += 6;
      doc.text(`Amount: ₹${booking.totalAmount}`, 14, y);
      y += 6;
      doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleString()}`, 14, y);
      y += 6;
      doc.text(`Status: ${booking.status}`, 14, y);
      y += 6;
      doc.text(`Rating: ${booking.rating || "N/A"}`, 14, y);
      y += 6;
      doc.text(`Feedback: ${booking.feedback || "No feedback provided"}`, 14, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.setFontSize(14);
    doc.text(`Total Spent: ₹${totalSpent}`, 14, y + 5);

    doc.save("my_bookings.pdf");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        Total Spent: <span style={{ fontWeight: "bold", color: "#2E7D32" }}>₹{totalSpent}</span>
      </Typography>

      <Button
        onClick={handleDownloadPDF}
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "8px",
          ":hover": { backgroundColor: "#1565c0" },
        }}
      >
        Download PDF
      </Button>

      <Grid container spacing={3} justifyContent="center">
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  background: statusColors[booking.status] || "#e3e3e3",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  color: "#fff",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {booking.customerName}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {booking.customerEmail}
                  </Typography>
                  <Typography variant="body2">Phone: {booking.customerPhone}</Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 1, color: "#ffeb3b" }}
                  >
                    ₹{booking.totalAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Booking Date: {new Date(booking.bookingDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                    Status: {booking.status}
                  </Typography>

                  {feedbackData[booking._id] ? (
                    <>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Feedback: {feedbackData[booking._id].feedback}
                      </Typography>
                      <Typography variant="body2">
                        Rating: <Rating value={feedbackData[booking._id].rating} readOnly precision={0.5} />
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      No feedback available.
                    </Typography>
                  )}

                  {/* Handle submitting feedback */}
                  {!feedbackData[booking._id] && (
                    <>
                      <TextField
                        label="Your Feedback"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: "#fff", borderRadius: 1 }}
                        onChange={(e) =>
                          handleFeedbackChange(booking._id, "feedback", e.target.value)
                        }
                      />
                      <Rating
                        precision={0.5}
                        value={feedbackData[booking._id]?.rating || 0}
                        onChange={(e, newValue) =>
                          handleFeedbackChange(booking._id, "rating", newValue)
                        }
                        sx={{ mt: 1 }}
                      />
                      <Button
                        onClick={() => handleSubmitFeedback(booking._id)}
                        size="small"
                        variant="contained"
                        sx={{ mt: 1, backgroundColor: "#2e7d32", ":hover": { backgroundColor: "#1b5e20" } }}
                      >
                        Submit Feedback
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyBookings;

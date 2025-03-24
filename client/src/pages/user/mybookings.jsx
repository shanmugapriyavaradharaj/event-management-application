import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const statusColors = {
  Confirmed: "linear-gradient(135deg, #4CAF50, #81C784)",
  Pending: "linear-gradient(135deg, #FF9800, #FFB74D)",
  Canceled: "linear-gradient(135deg, #F44336, #E57373)",
};

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/bookings/my/" + user.email)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        Total Spent: <span style={{ fontWeight: "bold", color: "#2E7D32" }}>₹{totalSpent}</span>
      </Typography>
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
                    sx={{ marginTop: 1, color: "#ffeb3b" }}
                  >
                    ₹{booking.totalAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Booking Date: {new Date(booking.bookingDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ marginTop: 1 }}>
                    Status: {booking.status}
                  </Typography>
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
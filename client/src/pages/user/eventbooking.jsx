import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { UserContext } from "../../UserContext";
import DummyPayment from "./DummyPayment";
const Booking = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  const { eventId } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(false);
  console.log(user);
  const [formData, setFormData] = useState({
    customerName: user?.name,
    customerEmail:user?.email,
    customerPhone: "",
  });

 
  
  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/events/events/${eventId}`);
        setEvent(res.data.event);
      } catch (error) {
        console.error("Error fetching event", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    setPayment(true);

    setLoading(false);

  };

  if (loading) return <CircularProgress style={{ marginTop: "20px" }} />;

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} style={{ marginTop: 20 }}>
        {/* Left Side: Booking Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Book Your Event
            </Typography>
            <Typography variant="h6" gutterBottom>
              {event.eventType} - {event.location}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Date: {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" color="primary" style={{ marginTop: 10 }}>
              Total Price: ₹{event.totalPrice}
            </Typography>

            {/* Name Input */}
            <TextField
              fullWidth
              label="Your Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              margin="normal"
            />

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              margin="normal"
            />

            {/* Phone Input */}
            <TextField
              fullWidth
              label="Phone Number"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              margin="normal"
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBooking}
              style={{ marginTop: 20 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Confirm Booking"}
            </Button>

            {
              payment ? (<><DummyPayment bookingdata={{
                ...formData,
                eventId,
                totalAmount: event.totalPrice,
              }} /></>) : null
            }


          </Paper>
        </Grid>

        {/* Right Side: Image Carousel */}
        <Grid item xs={12} md={6}>
          <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
            {event.images?.length > 0 ? (
              event.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Event ${index}`}
                    style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No images available
              </Typography>
            )}
          </Swiper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Booking;

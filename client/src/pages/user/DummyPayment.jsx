import React, { useState } from "react";
import { TextField, Button, Typography, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DummyPayment = (props) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setSuccess(true);

  const bookingData=  props.bookingdata

  try {
    await axios.post("http://localhost:4000/api/bookings", bookingData);///api/bookings
    alert("Booking successful!");
  } catch (error) {
    console.log("Error booking event", error);
    
    alert("Error booking event");
  }


    setTimeout(() => {
      setOpen(false);
      navigate("/success");
    }, 2000);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Make Payment
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Payment Details
          </Typography>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            label="Expiry Date (MM/YY)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
            style={{ marginTop: 20 }}
          >
            Pay Now
          </Button>
          {success && (
            <Typography color="success" align="center" style={{ marginTop: 10 }}>
              Payment Successful!
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DummyPayment;

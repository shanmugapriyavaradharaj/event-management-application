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
  const [errors, setErrors] = useState({});

  const validateCardDetails = () => {
    let newErrors = {};
    
    // Validate Card Number (16 digits, numeric)
    if (!/^[0-9]{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Validate Expiry Date (MM/YY format, year >= 2025)
    const match = expiryDate.match(/^(0[1-9]|1[0-2])\/(\d{4})$/);
    if (!match) {
      newErrors.expiryDate = "Invalid format (MM/YYYY)";
    } else {
      const year = parseInt(match[2], 10);
      if (year < 2025) {
        newErrors.expiryDate = "Year must be 2025 or later";
      }
    }

    // Validate CVV (3 or 4 digits, numeric)
    if (!/^[0-9]{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateCardDetails()) return;

    setSuccess(true);
    const bookingData = props.bookingdata;

    try {
      await axios.post("http://localhost:4000/api/bookings", bookingData);
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
      <br />
   
   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
   <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Make Payment
      </Button>
   </div>

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
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
          <TextField
            label="Expiry Date (MM/YYYY)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            error={!!errors.cvv}
            helperText={errors.cvv}
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

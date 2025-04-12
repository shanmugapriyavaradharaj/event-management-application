import React, { useState } from 'react';
import { Button, Typography, Card, CardContent, CircularProgress, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

const cardTypes = [
  { label: 'Visa', value: 'visa' },
  { label: 'MasterCard', value: 'mastercard' }
];

const PaymentForm = ({ data, onBack }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  const detectCardType = (number) => {
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    return '';
  };

  const handlePayment = async () => {
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number must be exactly 16 digits.');
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError('CVV must be 3 digits.');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError('Expiry date must be in MM/YY format.');
      return;
    }

    const totalCost = data.eventType.totalCost + data.venue.cost + data.accommodation.cost + data.transportation.price;

    const bookingPayload = {
      userId: user._id,
      eventType: data.eventType._id,
      venue: data.venue._id,
      accommodation: data.accommodation._id,
      transportation: data.transportation._id,
      bookingDate: new Date(),
      status: 'Pending',
      payment: {
        method: cardType,
        transactionId: `TXN-${Math.floor(Math.random() * 1000000000)}`,
        amount: totalCost || 0,
        status: 'Paid'
      }
    };

    setSubmitting(true);
    try {
      await axios.post('http://localhost:4000/api/private', bookingPayload);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCardNumber(val);
    const detected = detectCardType(val);
    if (detected) setCardType(detected);
  };

  if (submitting) return <CircularProgress />;

  if (success) return <Typography variant="h5" color="success.main">Booking Confirmed!</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Confirm and Pay</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">Event Type: {data.eventType.eventType}</Typography>
          <Typography variant="body1">Venue: {data.venue.venueName}</Typography>
          <Typography variant="body1">Accommodation: {data.accommodation.roomType}</Typography>
          <Typography variant="body1">Transportation: {data.transportation.transportType}</Typography>
          <Typography variant="body1">Total cost: {data.eventType.totalCost + data.venue.cost + data.accommodation.cost + data.transportation.price}</Typography>
        </CardContent>
      </Card>

      <TextField
        fullWidth
        label="Card Number"
        variant="outlined"
        margin="normal"
        value={cardNumber}
        onChange={handleCardNumberChange}
        inputProps={{ maxLength: 16 }}
      />

      <TextField
        fullWidth
        label="CVV"
        variant="outlined"
        margin="normal"
        value={cvv}
        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
        inputProps={{ maxLength: 3 }}
      />

      <TextField
        fullWidth
        label="Expiry Date (MM/YY)"
        variant="outlined"
        margin="normal"
        value={expiry}
        onChange={(e) => {
          let val = e.target.value.replace(/[^\d/]/g, '').slice(0, 5);
          if (val.length === 2 && !val.includes('/')) val = val + '/';
          setExpiry(val);
        }}
      />

      <TextField
        select
        fullWidth
        label="Card Type"
        variant="outlined"
        margin="normal"
        value={cardType}
        onChange={(e) => setCardType(e.target.value)}
      >
        {cardTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      <Button onClick={onBack} sx={{ mt: 2, mr: 2 }}>Back</Button>
      <Button variant="contained" color="primary" onClick={handlePayment} sx={{ mt: 2 }}>
        Pay & Confirm
      </Button>
    </div>
  );
};

export default PaymentForm;

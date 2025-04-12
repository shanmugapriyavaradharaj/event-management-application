import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const AccommodationForm = ({ onNext, onBack }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/accommodation')
      .then(res => {
        setOptions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) onNext({ accommodation: selected});
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Select Accommodation</Typography>
      <Grid container spacing={2}>
        {options.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card
              onClick={() => handleSelect(hotel)}
              sx={{ cursor: 'pointer', border: selected?._id === hotel._id ? '2px solid green' : '' }}
            >
              <CardContent>
                <Typography variant="h6">{hotel.hotelName}</Typography>
                <Typography variant="body2">Location: {hotel.location}</Typography>
                <Typography variant="body2">Room Type: {hotel.roomType}</Typography>
                <Typography variant="body2">Duration: {hotel.stayDuration}</Typography>
                <Typography variant="body2">Cost: ₹{hotel.cost}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button onClick={onBack} sx={{ mt: 2, mr: 2 }}>Back</Button>
      <Button variant="contained" color="primary" onClick={handleNext} disabled={!selected} sx={{ mt: 2 }}>
        Next
      </Button>
    </div>
  );
};

export default AccommodationForm;

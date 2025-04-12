import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const TransportationForm = ({ onNext, onBack }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/transportation')
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

    if (selected) onNext({ transportation: selected });
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Select Transportation</Typography>
      <Grid container spacing={2}>
        {options.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle._id}>
            <Card
              onClick={() => handleSelect(vehicle)}
              sx={{ cursor: 'pointer', border: selected?._id === vehicle._id ? '2px solid green' : '' }}
            >
              <CardContent>
                <Typography variant="h6">{vehicle.transportType}</Typography>
                <Typography variant="body2">Distance: {vehicle.distance}</Typography>
                <Typography variant="body2">Category: {vehicle.category}</Typography>
                <Typography variant="body2">Price: ₹{vehicle.price}</Typography>
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

export default TransportationForm;

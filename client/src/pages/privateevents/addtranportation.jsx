import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../admin/sidebar/sidebar';

const AddTransportation = () => {
  const [formData, setFormData] = useState({
    transportType: '',
    distance: '',
    category: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/admin/add-transportation', formData);
      alert('Transportation added!');
      setFormData({
        transportType: '',
        distance: '',
        category: '',
        price: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting transportation details');
    }
  };

  return (
    <>
      <Sidebar/>
      <br /> <br /> <br /> <br /> <br />

    <Box sx={{ maxWidth: 500, mx: 'auto', p: 8, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add Transportation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Transport Type"
          name="transportType"
          value={formData.transportType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Train">Train</MenuItem>
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Bus">Bus</MenuItem>
          <MenuItem value="Airplane">Airplane</MenuItem>
        </TextField>

        <TextField fullWidth label="Distance (e.g. 10 km)" name="distance" value={formData.distance} onChange={handleChange} margin="normal" />

        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="VIP">VIP</MenuItem>
          <MenuItem value="Normal">Normal</MenuItem>
        </TextField>

        <TextField fullWidth label="Price" type="number" name="price" value={formData.price} onChange={handleChange} margin="normal" />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
    </>
  );
};

export default AddTransportation;

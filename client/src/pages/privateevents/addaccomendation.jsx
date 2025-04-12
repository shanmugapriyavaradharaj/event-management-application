import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../admin/sidebar/sidebar';

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    roomType: '',
    stayDuration: '',
    cost: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/admin/add-accommodation', formData);
      alert('Accommodation added!');
      setFormData({
        hotelName: '',
        location: '',
        roomType: '',
        stayDuration: '',
        cost: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add accommodation');
    }
  };

  return (
    <>
      <Sidebar/>
      <br /> <br /> <br /> <br /> <br />
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add Accommodation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Hotel Name" name="hotelName" value={formData.hotelName} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" />

        <TextField
          select
          fullWidth
          label="Room Type"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Double">Double</MenuItem>
          <MenuItem value="Deluxe">Deluxe</MenuItem>
          <MenuItem value="Suite">Suite</MenuItem>
        </TextField>

        <TextField fullWidth label="Stay Duration (e.g. 3 Days)" name="stayDuration" value={formData.stayDuration} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Cost" type="number" name="cost" value={formData.cost} onChange={handleChange} margin="normal" />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
    </>
  );
};

export default AddAccommodation;

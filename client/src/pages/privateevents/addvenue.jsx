import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Grid
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../admin/sidebar/sidebar';

const AddVenue = () => {
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    description: '',
    cost: '',
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewURLs = files.map(file => URL.createObjectURL(file));
    setPreviews(previewURLs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    images.forEach((img) => data.append('images', img)); // 👈 'images' matches backend field
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:4000/api/admin/add-venue', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Venue Added!');
      setFormData({
        venueName: '',
        location: '',
        capacity: '',
        description: '',
        cost: '',
      });
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert('Error submitting venue');
    }
  };

  return (
    <>
      <Sidebar/>
      <br /> <br /> <br /> <br /> <br />
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add Venue</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Venue Name" name="venueName" value={formData.venueName} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleInputChange} margin="normal" multiline rows={3} />
        <TextField fullWidth label="Cost" name="cost" type="number" value={formData.cost} onChange={handleInputChange} margin="normal" />

        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
          Upload Images
          <input hidden accept="image/*" type="file" multiple onChange={handleImageChange} />
        </Button>

        {previews.length > 0 && (
          <Grid container spacing={2} mt={2}>
            {previews.map((src, index) => (
              <Grid item xs={4} key={index}>
                <img src={src} alt={`preview-${index}`} style={{ width: '100%', borderRadius: 8 }} />
              </Grid>
            ))}
          </Grid>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
    </>
  );
};

export default AddVenue;

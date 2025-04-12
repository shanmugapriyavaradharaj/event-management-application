import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Grid
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../admin/sidebar/sidebar';

const AddEventType = () => {
  const [formData, setFormData] = useState({
    eventType: '',
    decorationTheme: '',
    stageDecorationCost: '',
    hallDecorationCost: '',
    totalCost: '',
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    images.forEach((file) => data.append('images', file));

    data.append('eventType', formData.eventType);
    data.append('decorationTheme', formData.decorationTheme);
    data.append('stageDecorationCost', formData.stageDecorationCost);
    data.append('hallDecorationCost', formData.hallDecorationCost);
    data.append('totalCost', formData.hallDecorationCost+formData.stageDecorationCost);

    try {
      const res = await axios.post('http://localhost:4000/api/admin/add-event-type', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Event Type Added!');
      setFormData({
        eventType: '',
        decorationTheme: '',
        stageDecorationCost: '',
        hallDecorationCost: '',
        totalCost: '',
      });
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error(err);
      alert('Error submitting data');
    }
  };

  return (
<>
  <Sidebar/>
  <br /> <br /> <br /> <br /> <br />
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add Event Type</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Event Type" name="eventType" value={formData.eventType} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Decoration Theme" name="decorationTheme" value={formData.decorationTheme} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Stage Decoration Cost" name="stageDecorationCost" type="number" value={formData.stageDecorationCost} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Hall Decoration Cost" name="hallDecorationCost" type="number" value={formData.hallDecorationCost} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Total Cost" name="totalCost" type="number" defaultValue={formData.hallDecorationCost+formData.stageDecorationCost}  margin="normal" />

        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
          Upload Images
          <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
        </Button>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {previewUrls.map((url, idx) => (
            <Grid item xs={4} key={idx}>
              <img src={url} alt="preview" width="100%" style={{ borderRadius: 8 }} />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
</>
  );
};

export default AddEventType;

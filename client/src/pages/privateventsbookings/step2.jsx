import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';

const VenueForm = ({ onNext, onBack }) => {
  const [venues, setVenues] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({});


  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/venue')
      .then(res => {
        setVenues(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (venue) => {
    setSelected(venue);
  };

  const handleNext = () => {
    if (selected) onNext({ venue: selected });
  };

  const handlePrevImage = (id) => {
    setImageIndexes(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : venues.find(v => v._id === id).images.length - 1,
    }));
  };

  const handleNextImage = (id) => {
    setImageIndexes(prev => ({
      ...prev,
      [id]: prev[id] < venues.find(v => v._id === id).images.length - 1 ? prev[id] + 1 : 0,
    }));
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Select a Venue</Typography>
      <Grid container spacing={2}>
        {venues.map((venue) => {
          const currentIndex = imageIndexes[venue._id] || 0;
          const currentImage = venue.images[currentIndex]?.replace(/\\/g, '/');

          return (
            <Grid item xs={12} sm={6} md={4} key={venue._id}>
              <Card
                onClick={() => handleSelect(venue)}
                sx={{ cursor: 'pointer', border: selected?._id === venue._id ? '2px solid blue' : '' }}
              >
                {venue.images?.length > 0 && (
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img
                      src={currentImage}
                      alt="Venue"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(venue._id); }}
                      sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                    >
                      <ArrowBackIos fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handleNextImage(venue._id); }}
                      sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                    >
                      <ArrowForwardIos fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6">{venue.venueName}</Typography>
                  <Typography variant="body2">Location: {venue.location}</Typography>
                  <Typography variant="body2">Capacity: {venue.capacity}</Typography>
                  <Typography variant="body2">Cost: ₹{venue.cost}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Button onClick={onBack} sx={{ mt: 2, mr: 2 }}>Back</Button>
      <Button variant="contained" color="primary" onClick={handleNext} disabled={!selected} sx={{ mt: 2 }}>
        Next
      </Button>
    </div>
  );
};

export default VenueForm;

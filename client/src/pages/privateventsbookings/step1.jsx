import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, CircularProgress, IconButton, Box } from '@mui/material';
import axios from 'axios';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const EventTypeForm = ({ onNext }) => {
  const [eventTypes, setEventTypes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/event-type')
      .then(res => {
        setEventTypes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (eventType) => {
    setSelected(eventType);
  };

  const handleNext = () => {

    if (selected) onNext({ eventType: selected, });
  };

  const handlePrevImage = (id) => {
    setImageIndexes(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : eventTypes.find(e => e._id === id).images.length - 1,
    }));
  };

  const handleNextImage = (id) => {
    setImageIndexes(prev => ({
      ...prev,
      [id]: prev[id] < eventTypes.find(e => e._id === id).images.length - 1 ? prev[id] + 1 : 0,
    }));
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Select an Event Type</Typography>
      <Grid container spacing={2}>
        {eventTypes.map((event) => {
          console.log(event)
          
          const currentIndex = imageIndexes[event._id] || 0;
          const currentImage = event.images[currentIndex]?.replace(/\\/g, '/');

          return (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card
                onClick={() => handleSelect(event)}
                sx={{ cursor: 'pointer', border: selected?._id === event._id ? '2px solid blue' : '' }}
              >
                {event.images?.length > 0 && (
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img
                      src={currentImage}
                      alt="Event"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(event._id); }}
                      sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                    >
                      <ArrowBackIos fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handleNextImage(event._id); }}
                      sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                    >
                      <ArrowForwardIos fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6">{event.eventType}</Typography>
                  <Typography variant="body2">Theme: {event.decorationTheme}</Typography>
                  <Typography variant="body2">Cost: ₹{event.stageDecorationCost + event.hallDecorationCost}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleNext} disabled={!selected} sx={{ mt: 2 }}>
        Next
      </Button>
    </div>
  );
};

export default EventTypeForm;

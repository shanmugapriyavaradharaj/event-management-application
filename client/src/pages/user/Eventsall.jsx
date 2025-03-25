import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Eventsall = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [price, setPrice] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/events/events")
      .then((response) => setEvents(response.data.events))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.eventType.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? event.eventType === filter : true) &&
      (price ? event.totalPrice <= Number(price) : true)
  );

  return (
    <div style={{ padding: 20 }}>
  
    <Header/>


      <div style={{ display: "flex", gap: 10, marginBottom: -100 ,padding:"100px"}}>
        <TextField
          label="Search Event"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Filter by Type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Birthday">Birthday</MenuItem>
          <MenuItem value="Marriage">Marriage</MenuItem>
        </TextField>
        <TextField
          label="Max Price"
          type="number"
          variant="outlined"
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Grid container spacing={1} sx={{padding:"100px"}} >
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card>
              <Carousel>
                {event.images.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                   sx={{height:"3 00px"}}
                    image={image}
                    alt={event.eventType}
                  />
                ))}
              </Carousel>
              <CardContent>
                <Typography variant="h6">{event.eventType}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {event.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Price: ${event.totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/booking/${event._id}`)}
                  style={{ marginTop: 10 }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Eventsall;

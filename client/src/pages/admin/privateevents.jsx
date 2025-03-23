import React, { useState } from "react";
import { TextField, Button, Container, Typography, MenuItem, Box, Grid, Grid2, Drawer, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";


const CreateEvent = () => {
    const [event, setEvent] = useState({
        eventType: "",
        date: "",
        location: "",
        roomType: "AC",
        roomSharing: "",
        roomPrice: 0,
        transportType: "",
        distance: "",
        transportPrice: 0,
        transportCategory: "",
        seatingType: "",
        seatingPrice: 0,
        totalPrice: 0,
        images: []
    });

    const roomPricing = { AC: 5000, "Non-AC": 3000 };
    const transportPricing = { Train: 10, Car: 15, Bus: 8, Airplane: 50 };
    const transportCategoryMultiplier = { VIP: 1.5, Normal: 1 };
    const seatingPricing = { VIP: 2000, "Front Row": 1500, "Back Row": 1000, Others: 500 };

    const calculatePricing = (updatedEvent) => {
        const roomPrice = roomPricing[updatedEvent.roomType] || 0;
        const transportPrice = (transportPricing[updatedEvent.transportType] || 0) * (parseInt(updatedEvent.distance) || 0) * (transportCategoryMultiplier[updatedEvent.transportCategory] || 1);
        const seatingPrice = seatingPricing[updatedEvent.seatingType] || 0;
        const totalPrice = roomPrice + transportPrice + seatingPrice;

        return { roomPrice, transportPrice, seatingPrice, totalPrice };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedEvent = { ...event, [name]: value };
        const prices = calculatePricing(updatedEvent);
        setEvent({ ...updatedEvent, ...prices });
    };

    const handleImageChange = (e) => {
        setEvent({ ...event, images: [...event.images, ...e.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("eventType", event.eventType);
        formData.append("date", event.date);
        formData.append("location", event.location);
        formData.append("roomType", event.roomType);
        formData.append("roomSharing", event.roomSharing);
        formData.append("roomPrice", event.roomPrice);
        formData.append("transportType", event.transportType);
        formData.append("distance", event.distance);
        formData.append("transportPrice", event.transportPrice);
        formData.append("transportCategory", event.transportCategory);
        formData.append("seatingType", event.seatingType);
        formData.append("seatingPrice", event.seatingPrice);
        formData.append("totalPrice", event.totalPrice);

        // Append multiple images
        for (let i = 0; i < event.images.length; i++) {
            formData.append("images", event.images[i]);
        }

        try {
            await axios.post("http://localhost:4000/api/events/events", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Event created successfully");
            setEvent({
                eventType: "",
                date: "",
                location: "",
                roomType: "AC",
                roomSharing: "",
                roomPrice: 0,
                transportType: "",
                distance: "",
                transportPrice: 0,
                transportCategory: "",
                seatingType: "",
                seatingPrice: 0,
                totalPrice: 0,
                images: []
            });
        } catch (error) {
            console.error("Error creating event", error);
        }
    };

    return (
        <>
            <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>

 <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
                    <List>
                        <Link to={"/admin"}>
                            <ListItem button>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        <Link to={"/admin/eventmanagement"}>
                            <ListItem button>
                                <ListItemText primary="Events" />
                            </ListItem>
                        </Link>

                        <Link to={"/admin/usermanagement"}>
                            <ListItem button>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </Link>

                        <Link to={"/admin/private-events"}>
                            <ListItem button>
                                <ListItemText primary="Create-Private-Event" />
                            </ListItem>
                        </Link>
                        <Link to={"/admin/private-events-list"}>
                            <ListItem button>
                                <ListItemText primary="Private-Events" />
                            </ListItem>
                        </Link>

                        <ListItem button>
                            <ListItemText primary="Analytics" />
                        </ListItem>
                    </List>
                </Drawer>

                <div style={{ marginLeft: "" }}>
                    <Container maxWidth="sm">
                        <Typography variant="h4" align="center" gutterBottom>
                            Create Event
                        </Typography>
                        <Box mt={3} p={2} style={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
                            <Typography variant="h6" gutterBottom>
                                Pricing Details
                            </Typography>
                            <Grid2 container spacing={2}>
                                {Object.entries(roomPricing).map(([type, price]) => (
                                    <Grid2 item xs={6} key={type} style={{ backgroundColor: "#ffdddd", padding: "8px", borderRadius: "5px" }}>
                                        {type}: {price}
                                    </Grid2>
                                ))}

                                {Object.entries(transportPricing).map(([type, price]) => (
                                    <Grid2 item xs={6} key={type} style={{ backgroundColor: "#ddffdd", padding: "8px", borderRadius: "5px" }}>
                                        {type}: {price} per km
                                    </Grid2>
                                ))}
                                {Object.entries(seatingPricing).map(([type, price]) => (
                                    <Grid2 item xs={6} key={type} style={{ backgroundColor: "#ddddff", padding: "8px", borderRadius: "5px" }}>
                                        {type}: {price}
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TextField label="Event Type" name="eventType" value={event.eventType} onChange={handleChange} fullWidth margin="normal" required />
                            <TextField type="date" name="date" value={event.date} onChange={handleChange} fullWidth margin="normal" required />
                            <TextField label="Location" name="location" value={event.location} onChange={handleChange} fullWidth margin="normal" required />

                            <TextField select label="Room Type" name="roomType" value={event.roomType} onChange={handleChange} fullWidth margin="normal">
                                <MenuItem value="AC">AC</MenuItem>
                                <MenuItem value="Non-AC">Non-AC</MenuItem>
                            </TextField>
                            <TextField label="Room Price" name="roomPrice" value={event.roomPrice} fullWidth margin="normal" disabled style={{ color: "blue" }} />
                            {/* <TextField label="Room Price" name="roomPrice" value={event.roomPrice} fullWidth margin="normal" disabled style={{ color: "blue" }} /> */}
                            <TextField label="Room Sharing" name="roomSharing" value={event.roomSharing} onChange={handleChange} fullWidth margin="normal" />
                            <TextField select label="Transport Type" name="transportType" value={event.transportType} onChange={handleChange} fullWidth margin="normal">
                                <MenuItem value="Train">Train</MenuItem>
                                <MenuItem value="Car">Car</MenuItem>
                                <MenuItem value="Bus">Bus</MenuItem>
                                <MenuItem value="Airplane">Airplane</MenuItem>
                            </TextField>
                            <TextField label="Distance (KM)" name="distance" value={event.distance} onChange={handleChange} fullWidth margin="normal" />
                            <TextField select label="Transport Category" name="transportCategory" value={event.transportCategory} onChange={handleChange} fullWidth margin="normal">
                                <MenuItem value="VIP">VIP</MenuItem>
                                <MenuItem value="Normal">Normal</MenuItem>
                            </TextField>
                            <TextField label="Transport Price" name="transportPrice" value={event.transportPrice} fullWidth margin="normal" disabled style={{ color: "green" }} />

                            <TextField select label="Seating Type" name="seatingType" value={event.seatingType} onChange={handleChange} fullWidth margin="normal">
                                <MenuItem value="VIP">VIP</MenuItem>
                                <MenuItem value="Front Row">Front Row</MenuItem>
                                <MenuItem value="Back Row">Back Row</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </TextField>
                            <TextField label="Seating Price" name="seatingPrice" value={event.seatingPrice} fullWidth margin="normal" disabled style={{ color: "red" }} />
                            <TextField label="Total Price" name="totalPrice" value={event.totalPrice} fullWidth margin="normal" disabled style={{ color: "purple" }} />

                            <input type="file" multiple onChange={handleImageChange} />

                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Event
                            </Button>


                        </form>

                        <br />
                    </Container>
                </div>
            </div>

        </>
    );
};

export default CreateEvent;

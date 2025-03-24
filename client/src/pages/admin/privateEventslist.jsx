import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Header from "../Header";

const PrivateEventList = () => {
    const [events, setEvents] = useState([]);
    const [editEvent, setEditEvent] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/events/events");
            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/events/events/${id}`);
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleEdit = (event) => {
        setEditEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditEvent(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/events/events/${editEvent._id}`, editEvent);
            fetchEvents();
            handleClose();
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <>
 <Header/>
            <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>
                <Sidebar />

                <div style={{ marginLeft: "200px" }}>
                    <h1>Private Event List</h1>
                    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell>Event Type</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Room Type</TableCell>
                                    <TableCell>Room Sharing</TableCell>
                                    <TableCell>Room Price</TableCell>
                                    <TableCell>Transport Type</TableCell>
                                    <TableCell>Distance</TableCell>
                                    <TableCell>Transport Price</TableCell>
                                    <TableCell>Transport Category</TableCell>
                                    <TableCell>Seating Type</TableCell>
                                    <TableCell>Seating Price</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event._id}>
                                        <TableCell>{event.eventType}</TableCell>
                                        <TableCell>{new Date(event.date).toDateString()}</TableCell>
                                        <TableCell>{event.location}</TableCell>
                                        <TableCell>{event.roomType}</TableCell>
                                        <TableCell>{event.roomSharing}</TableCell>
                                        <TableCell>${event.roomPrice}</TableCell>
                                        <TableCell>{event.transportType}</TableCell>
                                        <TableCell>{event.distance} KM</TableCell>
                                        <TableCell>${event.transportPrice}</TableCell>
                                        <TableCell>{event.transportCategory}</TableCell>
                                        <TableCell>{event.seatingType}</TableCell>
                                        <TableCell>${event.seatingPrice}</TableCell>
                                        <TableCell>${event.totalPrice}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(event)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(event._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Edit Modal */}
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Edit Event</DialogTitle>
                            <DialogContent>
                                <TextField label="Event Type" fullWidth value={editEvent?.eventType || ""} onChange={(e) => setEditEvent({ ...editEvent, eventType: e.target.value })} margin="dense" />
                                <TextField label="Date" fullWidth type="date" value={editEvent?.date?.split('T')[0] || ""} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} margin="dense" />
                                <TextField label="Location" fullWidth value={editEvent?.location || ""} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} margin="dense" />
                                <TextField label="Room Type" fullWidth value={editEvent?.roomType || ""} onChange={(e) => setEditEvent({ ...editEvent, roomType: e.target.value })} margin="dense" />
                                <TextField label="Room Sharing" fullWidth type="number" value={editEvent?.roomSharing || ""} onChange={(e) => setEditEvent({ ...editEvent, roomSharing: e.target.value })} margin="dense" />
                                <TextField label="Room Price" fullWidth type="number" value={editEvent?.roomPrice || ""} onChange={(e) => setEditEvent({ ...editEvent, roomPrice: e.target.value })} margin="dense" />
                                <TextField label="Transport Type" fullWidth value={editEvent?.transportType || ""} onChange={(e) => setEditEvent({ ...editEvent, transportType: e.target.value })} margin="dense" />
                                <TextField label="Distance" fullWidth type="number" value={editEvent?.distance || ""} onChange={(e) => setEditEvent({ ...editEvent, distance: e.target.value })} margin="dense" />
                                <TextField label="Transport Price" fullWidth type="number" value={editEvent?.transportPrice || ""} onChange={(e) => setEditEvent({ ...editEvent, transportPrice: e.target.value })} margin="dense" />
                                <TextField label="Transport Category" fullWidth value={editEvent?.transportCategory || ""} onChange={(e) => setEditEvent({ ...editEvent, transportCategory: e.target.value })} margin="dense" />
                                <TextField label="Seating Type" fullWidth value={editEvent?.seatingType || ""} onChange={(e) => setEditEvent({ ...editEvent, seatingType: e.target.value })} margin="dense" />
                                <TextField label="Seating Price" fullWidth type="number" value={editEvent?.seatingPrice || ""} onChange={(e) => setEditEvent({ ...editEvent, seatingPrice: e.target.value })} margin="dense" />
                                <TextField label="Total Price" fullWidth type="number" value={editEvent?.totalPrice || ""} onChange={(e) => setEditEvent({ ...editEvent, totalPrice: e.target.value })} margin="dense" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleUpdate} color="primary">Update</Button>
                            </DialogActions>
                        </Dialog>
                    </TableContainer>
                </div>

            </div>
        </>
    );
};

export default PrivateEventList;

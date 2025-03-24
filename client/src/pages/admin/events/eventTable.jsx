import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/event/${id}`);
    setEvents(events.filter((event) => event._id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:4000/event/${selectedEvent._id}`, selectedEvent);
    setEvents(events.map(event => event._id === selectedEvent._id ? selectedEvent : event));
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.ticketPrice}</TableCell>
                <TableCell>{event.Quantity}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(event)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(event._id)} style={{ marginLeft: 10 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4 }}>
          <h2>Edit Event</h2>
          <TextField fullWidth margin="normal" label="Title" name="title" value={selectedEvent?.title || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Description" name="description" value={selectedEvent?.description || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Location" name="location" value={selectedEvent?.location || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Price" name="ticketPrice" value={selectedEvent?.ticketPrice || ""} onChange={handleChange} type="number" />
          <TextField fullWidth margin="normal" label="Quantity" name="Quantity" value={selectedEvent?.Quantity || ""} onChange={handleChange} type="number" />
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default EventsTable;

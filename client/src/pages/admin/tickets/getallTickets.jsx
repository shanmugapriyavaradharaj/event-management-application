import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/tickets")
         .then((response) => response.json())
         .then((data) => setTickets(data));
  }, []);

  const handleDelete = (id) => {
    setTickets(tickets.filter((ticket) => ticket._id !== id));
  };

  return (
    <Paper sx={{ padding: 2, margin: "20px", animation: "fadeIn 1s" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell>Event Time</TableCell>
              <TableCell>Ticket Price</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .filter((ticket) =>
                ticket.ticketDetails.name.toLowerCase().includes(search)
              )
              .map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell>{ticket.ticketDetails.name}</TableCell>
                  <TableCell>{ticket.ticketDetails.email}</TableCell>
                  <TableCell>{ticket.ticketDetails.eventname}</TableCell>
                  <TableCell>{new Date(ticket.ticketDetails.eventdate).toLocaleDateString()}</TableCell>
                  <TableCell>{ticket.ticketDetails.eventtime}</TableCell>
                  <TableCell>{ticket.ticketDetails.ticketprice}</TableCell>
                  <TableCell>
                    <img
                      src={ticket.ticketDetails.qr}
                      alt="QR Code"
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(ticket._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TicketTable;

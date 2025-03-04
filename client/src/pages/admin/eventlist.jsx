import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";

const initialEvents = [
  {
    id: 1,
    owner: "John Doe",
    title: "Tech Conference 2025",
    organizedBy: "TechCorp",
    eventDate: "2025-04-10",
    location: "New York",
    Participants: 150,
    Income: 3000,
    ticketPrice: 20,
  },
  {
    id: 2,
    owner: "Jane Smith",
    title: "Music Fest 2025",
    organizedBy: "LiveNation",
    eventDate: "2025-06-15",
    location: "Los Angeles",
    Participants: 500,
    Income: 10000,
    ticketPrice: 25,
  },
];

export default function EventManagements() {
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

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



          <ListItem button>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
      </Drawer>

      <br />

      <div style={{marginLeft:"200px"}}>
      <Typography variant="h4" gutterBottom>
        Event Management
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Events Overview
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Organizer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Participants</TableCell>
                  <TableCell>Income ($)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.organizedBy}</TableCell>
                    <TableCell>{event.eventDate}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.Participants}</TableCell>
                    <TableCell>{event.Income}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      </div>

     
    </div>
  );
}

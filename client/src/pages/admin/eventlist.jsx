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
import Sidebar from "./sidebar/sidebar";
import Header from "../Header";
import EventsTable from "./events/eventTable";

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
    <>
     <Header/>
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

        <Sidebar/>

      <br />

      <div style={{ marginLeft: "200px" }}>
      <EventsTable/>
      </div>


    </div>
    </>
  );
}

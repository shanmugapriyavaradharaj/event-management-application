import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar/sidebar";
import Header from "../Header";

// const events = [
//   { id: 1, name: "Tech Conference 2025", date: "2025-04-10", status: "Upcoming" },
//   { id: 2, name: "Music Fest 2025", date: "2025-06-15", status: "Ongoing" },
//   { id: 3, name: "Food Expo 2025", date: "2025-07-20", status: "Completed" },
// ];


function getStatus(eventDate) {
  const today = new Date();
  const event = new Date(eventDate);

  if (event > today) {
    return "Upcoming";
  } else if (event.toDateString() === today.toDateString()) {
    return "Ongoing";
  } else {
    return "Completed";
  }
}






const analyticsData = [
  { name: "Jan", attendees: 200 },
  { name: "Feb", attendees: 400 },
  { name: "Mar", attendees: 600 },
];

export default function AdminDashboard() {



  const [Dashboarddata, setDashboarddata] = useState({
    events: 2,
    activeusers: 3,
    bookedTicketsCount: 1
  })

  const [events, setevents] = useState([])


  useEffect(() => {


    const fetchdata = async () => {


      const { data } = await axios.get("http://localhost:4000/admin/dashboard")
      setevents(data.events);
      setDashboarddata(data);
    }

    fetchdata()


  }, [])








  return (
    <>
    <Header/>
    <div style={{ display: "flex" }}>
    <Sidebar/>
      <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <Card sx={{ backgroundColor: "lightyellow" }}>
            <CardContent>
              <Typography variant="h6">Total Events</Typography>
              <Typography variant="h4">{Dashboarddata.events.length}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "lightgreen" }} >
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{Dashboarddata.activeusers}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "lightblue" }} >
            <CardContent>
              <Typography variant="h6">Booked Tickets</Typography>
              <Typography variant="h4">{Dashboarddata.bookedTicketsCount}</Typography>
            </CardContent>
          </Card>
        </div>

        <Card style={{ marginBottom: "24px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Event Overview</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.eventDate}</TableCell>
                      <TableCell style={{ backgroundColor: getStatus(event.eventDate) == "Upcoming" ? "green" : "" }}>{getStatus(event.eventDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Attendee Analytics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendees" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}

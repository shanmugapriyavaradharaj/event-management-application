import { useState } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const events = [
  { id: 1, name: "Tech Conference 2025", date: "2025-04-10", status: "Upcoming" },
  { id: 2, name: "Music Fest 2025", date: "2025-06-15", status: "Ongoing" },
  { id: 3, name: "Food Expo 2025", date: "2025-07-20", status: "Completed" },
];

const analyticsData = [
  { name: "Jan", attendees: 200 },
  { name: "Feb", attendees: 400 },
  { name: "Mar", attendees: 600 },
];

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Events</Typography>
              <Typography variant="h4">{events.length}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">1,250</Typography>
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
                    <TableRow key={event.id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.status}</TableCell>
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
  );
}

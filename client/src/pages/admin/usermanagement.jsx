import { useState } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const events = [
  { id: 1, name: "Tech Conference 2025", date: "2025-04-10", status: "Upcoming" },
  { id: 2, name: "Music Fest 2025", date: "2025-06-15", status: "Ongoing" },
  { id: 3, name: "Food Expo 2025", date: "2025-07-20", status: "Completed" },
];

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" },
];

const analyticsData = [
  { name: "Jan", attendees: 200 },
  { name: "Feb", attendees: 400 },
  { name: "Mar", attendees: 600 },
];

export default function UserDashboard() {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div style={{ display: "flex" }}>
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
      <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        
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

        <Card style={{ marginBottom: "24px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>User Management</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} style={{ backgroundColor: user.role === "admin" ? "#ffcccc" : "#cce5ff" }}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
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

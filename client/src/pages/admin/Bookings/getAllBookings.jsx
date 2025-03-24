import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, IconButton, TextField, Button, ListItem, ListItemText, Drawer, List } from "@mui/material";
import { Delete, FileDownload } from "@mui/icons-material";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import Header from "../../Header";
import Sidebar from "../sidebar/sidebar";

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/bookings");
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:4000/api/bookings/${id}`, { status: newStatus });
            setBookings((prev) => prev.map((booking) => (booking._id === id ? { ...booking, status: newStatus } : booking)));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/bookings/${id}`);
            setBookings((prev) => prev.filter((booking) => booking._id !== id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };



    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Booking Details", 10, 10);

        let y = 20; // Initial vertical position

        bookings.forEach((booking, index) => {
            doc.setFontSize(12);
            doc.text(`Booking ${index + 1}:`, 10, y);
            doc.text(`Customer Name: ${booking.customerName}`, 10, y + 10);
            doc.text(`Email: ${booking.customerEmail}`, 10, y + 20);
            doc.text(`Phone: ${booking.customerPhone}`, 10, y + 30);
            doc.text(`Event Type: ${booking.eventId.eventType}`, 10, y + 40);
            doc.text(`Location: ${booking.eventId.location}`, 10, y + 50);
            doc.text(`Amount: ${booking.totalAmount}`, 10, y + 60);
            doc.text(`Status: ${booking.status}`, 10, y + 70);
            y += 90; // Move down for the next booking
        });

        doc.save("bookings.pdf");
    };


    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredBookings);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
        XLSX.writeFile(workbook, "bookings.xlsx");
    };

    const filteredBookings = bookings.filter((b) =>
        (b.customerName.toLowerCase().includes(search.toLowerCase()) || b.customerEmail.toLowerCase().includes(search.toLowerCase())) &&
        (statusFilter ? b.status === statusFilter : true)
    );

    return (
        <>
 <Header />
        <br />
        <br />
        <br />

  <Sidebar/>

            <div style={{ marginLeft: "299px" }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <TextField label="Search" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
                        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                        <Button variant="contained" color="primary" startIcon={<FileDownload />} onClick={exportPDF}>
                            Export PDF
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<FileDownload />} onClick={exportExcel}>
                            Export Excel
                        </Button>
                    </div>
                    <TableContainer component={Paper} elevation={5} sx={{width:"90%", borderRadius: 3, overflow: "hidden" }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer Name</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Event Type</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredBookings.map((booking) => (
                                    <motion.tr key={booking._id} whileHover={{ scale: 1.02 }}>
                                        <TableCell>{booking.customerName}</TableCell>
                                        <TableCell>{booking.customerEmail}</TableCell>
                                        <TableCell>{booking.customerPhone}</TableCell>
                                        <TableCell>{booking.eventId.eventType}</TableCell>
                                        <TableCell>{booking.eventId.location}</TableCell>
                                        <TableCell>{booking.totalAmount}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                                sx={{ width: "120px" }}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Confirmed">Confirmed</MenuItem>
                                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="error" onClick={() => handleDelete(booking._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </div>
        </>
    );
};

export default BookingTable;

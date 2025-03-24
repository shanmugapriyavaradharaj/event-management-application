import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import Header from "../../Header";
import TicketTable from "./getallTickets";
import { Typography } from "@mui/material";




export default function AllTicketDetails() {


  return (
    <>
    <Header/>
    <div style={{ display: "flex" }}>
    <Sidebar/>
      <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh", flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom> All Ticket Details </Typography>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "24px" }}>
       
       <TicketTable/>

         
        </div>

    

        
      </div>
    </div>
    </>
  );
}

import { Drawer, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function Sidebar() {
  return (
    <div>
              <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
                            <List>
                                <Link to={"/admin"}>
                                    <ListItem button>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>
                                </Link>

                                <Link to={"/createEvent"}>
                                <ListItem button>
                                    <ListItemText primary="Create-public-event" />
                                </ListItem>
                                </Link>
                                <Link to={"/admin/EventType"}>
                                <ListItem button>
                                    <ListItemText primary="AddEvent" />
                                </ListItem>
                                </Link>
                                
                                <Link to={"/admin/Venue"}>
                                <ListItem button>
                                    <ListItemText primary="AddVenue" />
                                </ListItem>
                                </Link>
                                <Link to={"/admin/Hotel"}>
                                <ListItem button>
                                    <ListItemText primary="AddHotel" />
                                </ListItem>
                                </Link>
                                <Link to={"/admin/Transportation"}>
                                <ListItem button>
                                    <ListItemText primary="transportation" />
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
        
                                <Link to={"/admin/private-events"}>
                                    <ListItem button>
                                        <ListItemText primary="Create-Private-Event" />
                                    </ListItem>
                                </Link>
                                <Link to={"/admin/private-events-list"}>
                                    <ListItem button>
                                        <ListItemText primary="Private-Events" />
                                    </ListItem>
                                </Link>
        
                                <Link to={"/admin/bookingtable"}>
                                    <ListItem button>
                                        <ListItemText primary="Private-Events-Bookings" />
                                    </ListItem>
                                </Link>
        
        
                                <Link to={"/admin/booked-tickets"}>
                                <ListItem button>
                                    <ListItemText primary="Total Booked Tickets" />
                                </ListItem>
                                </Link>


                            </List>
                        </Drawer>
    </div>
  )
}

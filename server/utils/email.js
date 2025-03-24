
const nodemailer = require('nodemailer');
require('dotenv').config();





const getBookingConfirmationEmailTemplate = (booking) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .details {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: left;
            }
            .details p {
                font-size: 16px;
                margin: 8px 0;
                color: #333;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
            .btn {
                background-color: #ff6600;
                color: white;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">🎉 Booking Confirmation 🎉</div>
            <div class="content">
                <p>Dear ${booking.customerName},</p>
                <p>Your booking has been successfully confirmed! Below are the details:</p>
                <div class="details">
                    <p><strong>Booking ID:</strong> ${booking._id}</p>
                    <p><strong>Event ID:</strong> ${booking.eventId}</p>
                    <p><strong>Customer Name:</strong> ${booking.customerName}</p>
                    <p><strong>Email:</strong> ${booking.customerEmail}</p>
                    <p><strong>Phone:</strong> ${booking.customerPhone}</p>
                    <p><strong>Booking Date:</strong> ${new Date(booking.bookingDate).toDateString()}</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                    <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
                    <a href="#" class="btn">View Booking Details</a>
                </div>
            </div>
            <div class="footer">
                <p>Thank you for choosing us! 🎊</p>
                <p>&copy; 2025 Your Event Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};



const getBookingEmailTemplate = (booking) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #0073e6;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .details {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .qr {
                margin-top: 15px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Booking Confirmation</div>
            <div class="content">
                <p>Dear <strong>${booking.ticketDetails.name}</strong>,</p>
                <p>Thank you for booking your event ticket with us! Below are your booking details:</p>
                <div class="details">
                    <p><strong>Event Name:</strong> ${booking.ticketDetails.eventname}</p>
                    <p><strong>Date:</strong> ${new Date(booking.ticketDetails.eventdate).toDateString()}</p>
                    <p><strong>Time:</strong> ${booking.ticketDetails.eventtime}</p>
                    <p><strong>Ticket Price:</strong> $${booking.ticketDetails.ticketprice}</p>
                </div>
                <div class="qr">
                    <p><strong>Scan the QR Code for Entry:</strong></p>
                    <img src="${booking.ticketDetails.qr}" alt="QR Code" width="150" height="150">
                </div>
                <p>We look forward to seeing you at the event!</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};




const getAdminBookingEmailTemplate = (booking) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #e63946;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .details {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">New Booking Notification</div>
            <div class="content">
                <p>Hello Admin,</p>
                <p>A new booking has been made. Below are the details:</p>
                <div class="details">
                    <p><strong>Customer Name:</strong> ${booking.ticketDetails.name}</p>
                    <p><strong>Email:</strong> ${booking.ticketDetails.email}</p>
                    <p><strong>Event Name:</strong> ${booking.ticketDetails.eventname}</p>
                    <p><strong>Date:</strong> ${new Date(booking.ticketDetails.eventdate).toDateString()}</p>
                    <p><strong>Time:</strong> ${booking.ticketDetails.eventtime}</p>
                    <p><strong>Ticket Price:</strong> $${booking.ticketDetails.ticketprice}</p>
                    <p><strong>Number of Tickets:</strong> ${booking.count}</p>
                </div>
                <p>Please review and confirm the booking.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


const getStatusUpdateEmailTemplate = (status, username, usermail) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Status Update</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #FFA500;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .status-box {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
                text-align: center;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Booking Status Updated</div>
            <div class="content">
                <p>Dear <strong>${username}</strong>,</p>
                <p>Your booking status has been updated. Below are the details:</p>
                <div class="status-box">
                    Status: <strong>${status}</strong>
                </div>
                <p>If you have any questions, feel free to contact us at <a href="mailto:${usermail}">${usermail}</a>.</p>
                <p>Thank you for choosing our service.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};



const getEventLaunchEmailTemplate = (newEvent) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Event Launched</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .event-box {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
            }
            .event-title {
                font-size: 20px;
                font-weight: bold;
                color: #333;
            }
            .event-details {
                margin-top: 10px;
                font-size: 16px;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
            .event-image {
                width: 100%;
                max-height: 250px;
                border-radius: 8px;
                margin-top: 10px;
            }
            .btn {
                background-color: #ff6600;
                color: white;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">🎉 New Event Launched! 🎉</div>
            <div class="content">
                <p>Dear Guest,</p>
                <p>We are excited to introduce a brand-new event! Check out the details below:</p>
                <div class="event-box">
                    <p class="event-title">${newEvent.title}</p>
                    <img class="event-image" src="${newEvent.image}" alt="Event Image">
                    <p class="event-details"><strong>Organized By:</strong> ${newEvent.organizedBy}</p>
                    <p class="event-details"><strong>Date:</strong> ${new Date(newEvent.eventDate).toDateString()}</p>
                    <p class="event-details"><strong>Time:</strong> ${newEvent.eventTime}</p>
                    <p class="event-details"><strong>Location:</strong> ${newEvent.location}</p>
                    <p class="event-details"><strong>Ticket Price:</strong> $${newEvent.ticketPrice}</p>
                    <p>${newEvent.description}</p>
                    <a href="#" class="btn">Book Your Spot</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Event Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


const getPrivateEventLaunchEmailTemplate = (event) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Private Event Update</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #673AB7;
                color: white;
                padding: 15px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .event-box {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
            }
            .event-title {
                font-size: 20px;
                font-weight: bold;
                color: #333;
            }
            .event-details {
                margin-top: 10px;
                font-size: 16px;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
            .event-image {
                width: 100%;
                max-height: 250px;
                border-radius: 8px;
                margin-top: 10px;
            }
            .btn {
                background-color: #ff6600;
                color: white;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">🎊 New Private Event Update 🎊</div>
            <div class="content">
                <p>Dear Guest,</p>
                <p>We have an exciting private event update! Check out the details below:</p>
                <div class="event-box">
                    <p class="event-title">${event.eventType} Event</p>
                    ${event.images.length > 0 ? `<img class="event-image" src="${event.images[0]}" alt="Event Image">` : ""}
                    <p class="event-details"><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
                    <p class="event-details"><strong>Location:</strong> ${event.location}</p>
                    <hr>
                    <p class="event-details"><strong>Accommodation:</strong> ${event.roomType || "Not Included"}</p>
                    <p class="event-details"><strong>Sharing:</strong> ${event.roomSharing || "N/A"} people</p>
                    <p class="event-details"><strong>Room Price:</strong> $${event.roomPrice || "0.00"}</p>
                    <hr>
                    <p class="event-details"><strong>Transport:</strong> ${event.transportType || "Not Included"}</p>
                    <p class="event-details"><strong>Category:</strong> ${event.transportCategory || "N/A"}</p>
                    <p class="event-details"><strong>Distance:</strong> ${event.distance || "N/A"} km</p>
                    <p class="event-details"><strong>Transport Price:</strong> $${event.transportPrice || "0.00"}</p>
                    <hr>
                    <p class="event-details"><strong>Seating Arrangement:</strong> ${event.seatingType || "N/A"}</p>
                    <p class="event-details"><strong>Seating Price:</strong> $${event.seatingPrice || "0.00"}</p>
                    <hr>
                    <p class="event-details"><strong>Total Price:</strong> $${event.totalPrice || "0.00"}</p>
                    <a href="#" class="btn">Confirm Your Spot</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Event Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};







// ticket 
const sendBookingConfirmationmailEmail = async (recipientEmail, booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = getBookingEmailTemplate(booking);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: ' sendBooking Confirmation Email ',
            html: emailcontent
        })

        console.log("email has been sent");

    } catch (error) {

        console.error('Error sending  email:', error);

    }
   
}


const sendBookingConfirmationmailForPrivateEvenetsEmail = async (recipientEmail, booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = getBookingConfirmationEmailTemplate(booking);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: ' sendBooking Confirmation Email ',
            html: emailcontent
        })

        console.log("email has been sent");

    } catch (error) {

        console.error('Error sending  email:', error);

    }
   
}



const sendBookingAdminlEmail = async (recipientEmail, booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailcontent = getAdminBookingEmailTemplate(booking);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: ' New booking Arrived ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
   
}



const sendStatusupdatedmail = async(recipientEmail,status,username,usermail) => {
   
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailcontent = getStatusUpdateEmailTemplate(status,username,usermail);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Your booking status updated',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }

}

const sendEventLaunch = async(recipientEmail,newEvent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailcontent = getEventLaunchEmailTemplate(newEvent);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Launched new events',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}

const sendEventLaunchforPrivate = async(recipientEmail,event) => {


    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const emailcontent = getPrivateEventLaunchEmailTemplate(event);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Newly updated PrivateEvents',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error   email:', error);
    }
   
}


module.exports = {
    sendBookingAdminlEmail,
    sendBookingConfirmationmailEmail,
    sendBookingConfirmationmailForPrivateEvenetsEmail,
    sendEventLaunchforPrivate,
    sendStatusupdatedmail,
    sendEventLaunch
}
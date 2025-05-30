const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const Ticket = require("./models/Ticket");
const { sendEventLaunch, sendBookingAdminlEmail, sendBookingConfirmationmailEmail } = require("./utils/email");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bsbsfbrnsftentwnnwnwn";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173", // Specify your frontend URL
   credentials: true // Allow cookies and authentication headers
 }));



mongoose.connect(process.env.MONGO_URL);

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });

app.get("/test", (req, res) => {
   res.json("test ok");
});

app.post("/register", async (req, res) => {
   const { name, email, password, role } = req.body;
   console.log(req.body);
   

   try {
      const userDoc = await UserModel.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcryptSalt),
         role
      });
      res.json(userDoc);
   } catch (e) {
      res.status(422).json(e);
   }
});

app.post("/login", async (req, res) => {
   const { email, password } = req.body;

   const userDoc = await UserModel.findOne({ email });

   if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
   }

   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (!passOk) {
      return res.status(401).json({ error: "Invalid password" });
   }

   jwt.sign(
      {
         email: userDoc.email,
         id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
         if (err) {
            return res.status(500).json({ error: "Failed to generate token" });
         }
         res.cookie("token", token).json(userDoc);
      }
   );
});

app.get("/profile", (req, res) => {
   const { token } = req.cookies;
   if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         const { name, email, _id,role } = await UserModel.findById(userData.id);
         res.json({ name, email,role, _id });
      });
   } else {
      res.json(null);
   }
});

app.post("/logout", (req, res) => {
   res.cookie("token", "").json(true);
});

const eventSchema = new mongoose.Schema({
   owner: String,
   title: String,
   description: String,
   organizedBy: String,
   eventDate: Date,
   eventTime: String,
   location: String,
   Participants: Number,
   Count: Number,
   Income: Number,
   ticketPrice: Number,
   Quantity: Number,
   image: String,
   likes: Number,
   Comment: [String],
});

const Event = mongoose.model("Event", eventSchema);

app.post("/createEvent", upload.single("image"), async (req, res) => {
   try {
    
      console.log(req.body);
      
      const eventData = req.body;
      eventData.image = req.file ? req.file.path : "";
      const newEvent = new Event(eventData);
      await newEvent.save();

      const user= await UserModel.find()

      user.map(async (user)=>{

        if( user.role=="user"){

         await sendEventLaunch(user.email,newEvent)

        }

      })

      await 

      res.status(201).json(newEvent);
   } catch (error) {
      res.status(500).json({ error: "Failed to save the event to MongoDB" });
   }
});

app.get("/createEvent", async (req, res) => {
   try {
      const events = await Event.find();
      res.status(200).json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events from MongoDB" });
   }
});

app.get("/event/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedEvent);
   } catch (error) {
      res.status(500).json({ error: "Failed to update event in MongoDB" });
   }
});

app.put("/event/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedEvent);
   } catch (error) {
      res.status(500).json({ error: "Failed to update event in MongoDB" });
   }
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/event/:eventId", (req, res) => {
   const eventId = req.params.eventId;

   Event.findById(eventId)
      .then((event) => {
         if (!event) {
            return res.status(404).json({ message: "Event not found" });
         }

         event.likes += 1;
         return event.save();
      })
      .then((updatedEvent) => {
         res.json(updatedEvent);
      })
      .catch((error) => {
         console.error("Error liking the event:", error);
         res.status(500).json({ message: "Server error" });
      });
});

app.get("/events", (req, res) => {
   Event.find()
      .then((events) => {
         res.json(events);
      })
      .catch((error) => {
         console.error("Error fetching events:", error);
         res.status(500).json({ message: "Server error" });
      });
});

app.get("/event/:id/ordersummary", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});

app.get("/event/:id/ordersummary/paymentsummary", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);

      
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});

app.post("/tickets", async (req, res) => {
   try {

      const ticketDetails = req.body;
      
      const newTicket = new Ticket(ticketDetails);
      await newTicket.save();
      const event = await Event.findById(newTicket.eventid);
      event.Quantity=event.Quantity-1
     
     await event.save()

     const user= await UserModel.find()
     user.map(async (user)=>{

            if (user.role==="admin") {

               await  sendBookingAdminlEmail(user.email,ticketDetails)
               
            } else{

               await sendBookingConfirmationmailEmail(user.email,ticketDetails)

            }  



     })

      return res.status(201).json({ ticket: newTicket });
   } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Failed to create ticket" });
   }
});

app.get("/tickets", async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
   }
});

app.get("/tickets/user/:userId", (req, res) => {
   const userId = req.params.userId;

   Ticket.find({ userid: userId })
      .then((tickets) => {
         res.json(tickets);
      })
      .catch((error) => {
         console.error("Error fetching user tickets:", error);
         res.status(500).json({ error: "Failed to fetch user tickets" });
      });
});

app.delete("/tickets/:id", async (req, res) => {
   try {
      const ticketId = req.params.id;
      await Ticket.findByIdAndDelete(ticketId);
      res.status(204).send();
   } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
   }
});


app.get("/admin/dashboard", async (req,res) => {

   const events=await Event.find()
   const Activeusers=await UserModel.find()
   const BookedTickets=await Ticket.find()
   const users=await UserModel.find()



   res.status(200).json({
      activeusers:Activeusers.length,
      bookedTicketsCount:BookedTickets.length,
      events:events,
      users

   })

})



app.use("/api/events", require("./routes/events"));
app.use("/api", require("./routes/booking"));
app.use('/api/admin',  require('./routes/admin.event.routes'));
app.use('/api/private',  require('./routes/private.booking'));
app.use('/api/feedback',  require('./routes/feedbackRoutes'));

app.post("/chat", async (req, res) => {
   const { prompt } = req.body;
 
   try {
      const fetchResponse = await fetch("http://localhost:11434/api/generate", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           model: "llama3.2",
           prompt: prompt,
         }),
       });
       
       const data = await fetchResponse.text(); // response is streamed as plain text
       const lines = data.trim().split("\n");
       const messages = lines.map((line) => JSON.parse(line));
       const fullResponse = messages.map((m) => m.response).join("");
       
       res.json({ reply: fullResponse });
       
 
    
   } catch (error) {
     console.error("Error talking to Ollama:", error.message);
     res.status(500).json({ error: "Failed to generate response" });
   }
 });


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

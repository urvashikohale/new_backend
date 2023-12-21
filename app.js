const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Database Connection ERROR");
  });

// Define MongoDB Schema
const appointmentSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Express middleware
app.use(cors());
app.use(express.json());

// API routes
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const appointment = new Appointment({ title, start, end });
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (previous code)

app.get("/api/upcoming-appointments", async (req, res) => {
  try {
    const upcomingAppointments = await Appointment.find({
      start: { $gte: new Date() },
    }).sort({ start: "asc" });
    res.json(upcomingAppointments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (remaining code)

app.patch("/api/appointments/:id", async (req, res) => {
  try {
    const { start, end } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { start, end },
      { new: true } // Return the updated document
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/appointments/:id", async (req, res) => {
  console.log("appp", req);
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// const appointmentRoutes = require("./routes/appointment");

// //DATABASE
// mongoose
//   .connect(process.env.DATABASE)
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch(() => {
//     console.log("Database Connection ERROR");
//   });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());

// //rouutes
// app.use("/api", appointmentRoutes);

// //Port
// const port = 8000;

// //server
// app.listen(port, () => {
//   console.log(`app is running at ${port}`);
// });

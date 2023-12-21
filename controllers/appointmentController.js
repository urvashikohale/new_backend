const Appointment = require("../models/appointment");

exports.getAppointmentById = (req, res, next, id) => {
  Appointment.findById(id)
    .exec()
    .then((appointment) => {
      req.appointment = appointment;
      next();
    })
    .catch(() => {
      return res.status(400).json({
        error: "Appointment not found in DB",
      });
    });
};

exports.createAppointment = (req, res) => {
  let appointment = new Appointment(req.body);
  // console.log("REQ Appoin", appointment);
  //save to db
  appointment
    .save()
    .then((appointment) => {
      console.log("APPOIntment", appointment);
      res.json(appointment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Saving appointment in db failed",
      });
    });
};

//product listing
exports.getAllAppointments = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Appointment.find()
    .select("name _id ")
    // .sort([["updatedAt", "descending"]])
    //one more example
    //Product.find().sort([['updatedAt', 'descending']])
    // .limit(limit)
    .exec()
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      return res.status(500).json({
        error: "NO Appointment FOUND",
      });
    });
};

exports.deleteAppointment = (req, res) => {
  let appointment = req.appointment;
  appointment
    .deleteOne()
    .then((deletedAppointment) => {
      res.json({
        message: "Appointment Deleted Successfully",
        deletedAppointment,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "Failed to delete appointment",
      });
    });
};

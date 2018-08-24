const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

// Load Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");

// Idea Index Page
router.get("/", (req, res) => {
  Idea.find()
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

// Add Idea Form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add");
});

// Edit Idea Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", {
        idea: idea
      });
    }
  });
});

// Process Form
router.post("/", ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }
  if (!req.body.address) {
    errors.push({ text: "Please add address" });
  }
  if (!req.body.taskid) {
    errors.push({ text: "Please add a task id" });
  }
  if (!req.body.customername) {
    errors.push({ text: "Please add customers name" });
  }
  if (!req.body.standnumber) {
    errors.push({ text: "Please add a stand number" });
  }
  if (!req.body.meterno) {
    errors.push({ text: "Please add a meter number" });
  }
  if (!req.body.metermake) {
    errors.push({ text: "Please add a meter make" });
  }
  if (!req.body.reading) {
    errors.push({ text: "Please add readings" });
  }
  if (!req.body.waterleaks) {
    errors.push({ text: "Please say if there any water leaks or not" });
  }
  if (!req.body.assignedto) {
    errors.push({ text: "Please assign job card" });
  }
  if (errors.length > 0) {
    res.render("/add", {
      errors: errors,
      title: req.body.title,
      assignedto: req.body.assignedto,
      details: req.body.details,
      address: req.body.address,
      taskid: req.body.taskid,
      customername: req.body.customername,
      standnumber: req.body.standnumber,
      meterno: req.body.meterno,
      metermake: req.body.metermake,
      metertype: req.body.metertype,
      reading: req.body.reading,
      waterleaks: req.body.waterleaks
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id,
      assignedto: req.body.assignedto,
      address: req.body.address,
      taskid: req.body.taskid,
      customername: req.body.customername,
      standnumber: req.body.standnumber,
      meterno: req.body.meterno,
      metermake: req.body.metermake,
      metertype: req.body.metermake,
      reading: req.body.reading,
      waterleaks: req.body.waterleaks
    };
    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "job card added");
      res.redirect("/ideas");
    });
  }
});

// Edit Form process
router.put("/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.assignedto = req.body.assignedto;
    idea.address = req.body.address;
    idea.taskid = req.body.taskid;
    idea.customername = req.body.customername;
    idea.standnumber = req.body.standnumber;
    idea.meterno = req.body.meterno;
    idea.metermake = req.body.metermake;
    idea.metertype = req.body.metermake;
    idea.reading = req.body.reading;
    waterleaks = req.body.waterleaks;

    idea.save().then(idea => {
      req.flash("success_msg", "Job Card updated");
      res.redirect("/ideas");
    });
  });
});

// Delete Idea
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "job card removed");
    res.redirect("/ideas");
  });
});

module.exports = router;

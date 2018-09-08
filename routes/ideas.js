const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

// Load Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");

let taskid = [];

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
router.get("/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.user) {
      res.render("ideas/edit", {
        idea: idea
      });
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

  // consultant
  if (!req.body.taskid) {
    errors.push({ text: "Please add a task id" });
  }

  if (!req.body.action) {
    errors.push({ text: "Please add an action" });
  }
  if (!req.body.problem) {
    errors.push({ text: "Please add a problem" });
  }

  if (!req.body.address) {
    errors.push({ text: "Please add address" });
  }
  if (!req.body.suburb) {
    errors.push({ text: "Please add a suburb" });
  }

  if (!req.body.customername) {
    errors.push({ text: "Please add customers name" });
  }
  // contractor
  if (!req.body.assignedto) {
    errors.push({ text: "Please assign job card" });
  }
  if (!req.body.status) {
    errors.push({ text: "Please add current status" });
  }
  // service worker
  if (!req.body.standnumber) {
    errors.push({ text: "Please add a stand number" });
  }
  if (!req.body.streetnumber) {
    errors.push({ text: "Please add a street number" });
  }
  if (!req.body.streetname) {
    errors.push({ text: "Please add a street name" });
  }
  if (!req.body.meternumber) {
    errors.push({ text: "Please add a meter number" });
  }
  if (!req.body.metertype) {
    errors.push({ text: "Please add a meter tyoe" });
  }
  if (!req.body.reading) {
    errors.push({ text: "Please add readings" });
  }
  if (!req.body.dails) {
    errors.push({ text: "Please add dails" });
  }
  if (!req.body.size) {
    errors.push({ text: "Please add a size" });
  }
  if (!req.body.agedreplacement) {
    errors.push({ text: "Please add aged replacement" });
  }
  if (!req.body.waterleaks) {
    errors.push({ text: "Please say if there any water leaks or not" });
  }
  if (!req.body.fittingsused) {
    errors.push({ text: "Please add fittings used" });
  }

  if (errors.length > 0) {
    res.render("/add", {
      errors: errors,
      // consultant
      taskid: req.body.taskid,
      action: req.body.action,
      problem: req.body.problem,
      address: req.body.address,
      suburb: req.body.suburb,
      customername: req.body.customername,
      // contractor
      assignedto: req.body.assignedto,
      status: req.body.status,
      // service worker
      standnumber: req.body.standnumber,
      streetnumber: req.body.streetnumber,
      streetname: req.body.streetname,
      meternumber: req.body.meternumber,
      metertype: req.body.metertype,
      reading: req.body.reading,
      dails: req.body.dails,
      size: req.body.size,
      agedreplacement: req.body.agedreplacement,
      waterleaks: req.body.waterleaks,
      fittingsused: req.body.fittingsused
    });
  } else {
    const newUser = {
      // consultant
      taskid: req.body.taskid,
      action: req.body.action,
      problem: req.body.problem,
      address: req.body.address,
      suburb: req.body.suburb,
      customername: req.body.customername,
      // contractor
      assignedto: req.body.assignedto,
      status: req.body.status,
      // service worker
      standnumber: req.body.standnumber,
      streetnumber: req.body.streetnumber,
      streetname: req.body.streetname,
      meternumber: req.body.meternumber,
      metertype: req.body.metertype,
      reading: req.body.reading,
      dails: req.body.dails,
      size: req.body.size,
      agedreplacement: req.body.agedreplacement,
      waterleaks: req.body.waterleaks,
      fittingsused: req.body.fittingsused,
      user: req.user.id
    };

    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "job card added");
      res.redirect("/ideas");
    });
  }
});

// Edit Form process
router.put("/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    // new values
    // consultant
    idea.taskid = req.body.taskid;
    idea.action = req.body.action;
    idea.problem = req.body.problem;
    idea.address = req.body.address;
    idea.suburb = req.body.suburb;
    idea.customername = req.body.customername;
    // contractor
    idea.assignedto = req.body.assignedto;
    idea.status = req.body.status;
    // service worker
    idea.standnumber = req.body.standnumber;
    idea.streetnumber = req.body.streetnumber;
    idea.streetname = req.body.streetname;
    idea.meternumber = req.body.meternumber;
    idea.metertype = req.body.metertype;
    idea.reading = req.body.reading;
    idea.dails = req.body.dails;
    idea.size = req.body.size;
    idea.agedreplacement = req.body.agedreplacement;
    idea.waterleaks = req.body.waterleaks;
    idea.fittingsused = req.body.fittingsused;

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

// status page Page
router.get("/status", ensureAuthenticated, (req, res) => {
  res.render("ideas/status");
});

console.log(taskid.length);

module.exports = router;

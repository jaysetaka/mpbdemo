const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  taskid: {
    type: String,
    required: true
  },
  customername: {
    type: String,
    required: true
  },
  standnumber: {
    type: String,
    required: true
  },
  meterno: {
    type: String,
    required: true
  },
  metermake: {
    type: String,
    required: true
  },
  reading: {
    type: String,
    required: true
  },
  metertype: {
    type: String,
    required: true
  },
  assignedto: {
    type: String,
    required: true
  },
  waterleaks: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("ideas", IdeaSchema);

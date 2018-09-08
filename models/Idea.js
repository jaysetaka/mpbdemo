const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  // consultants

  taskid: [
    {
      type: String,
      required: true
    }
  ],

  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  customername: {
    type: String,
    required: true
  },
  // contractor
  assignedto: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  // service worker
  standnumber: {
    type: String,
    required: true
  },
  streetnumber: {
    type: String,
    required: true
  },
  streetname: {
    type: String,
    required: true
  },
  meternumber: {
    type: String,
    required: true
  },
  metertype: {
    type: String,
    required: true
  },
  reading: {
    type: String,
    required: true
  },
  dails: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  agedreplacement: {
    type: String,
    required: true
  },
  waterleaks: {
    type: String,
    required: true
  },
  fittingsused: {
    type: String,
    required: true
  }
});

mongoose.model("ideas", IdeaSchema);

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String, required: true}, 
    done: { type: Boolean, default: false},
  },
  {timestamps: true}

);
module.exports = mongoose.model("Note", noteSchema);
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type:String,
    required:true
  },
  item:{
    type:Number,
    required:true,
  }
});

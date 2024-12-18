const mongoose = require("mongoose");

const purohitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type:String,
    required:true,
  },
  price:{
    type:String,
    required:true,
  }
});

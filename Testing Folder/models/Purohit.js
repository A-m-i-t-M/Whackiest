// const mongoose = require("mongoose");
import exp from "constants";
import mongoose from "mongoose";

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

const Purohit = mongoose.model("Purohit", purohitSchema);
export default Purohit;
// module.exports = mongoose.model('Snippet', snippetSchema);
const mongoose = require("mongoose");

const serviceSchema=new mongoose.Schema({
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
        type:Number,
        required:true,
      }
})
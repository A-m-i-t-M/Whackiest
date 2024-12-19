import mongoose from "mongoose";

const purohitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Temple",
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
});

const Purohit = mongoose.model("Purohit", purohitSchema);
export default Purohit;
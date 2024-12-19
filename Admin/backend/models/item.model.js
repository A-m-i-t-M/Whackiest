import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Temple",
        required: true,
      },
      name:{
        type:String,
        required:true
      },
      price:{
        type:Number,
        required:true,
      }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
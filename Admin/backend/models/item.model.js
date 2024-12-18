import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
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

const Item = mongoose.model("Item", itemSchema);
export default Item;
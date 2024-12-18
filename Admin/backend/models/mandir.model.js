import mongoose from "mongoose";

const mandirSchema = mongoose.Schema({
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        threshhold:{
            type:Number,
            required:true
        }
})

const Mandir = mongoose.model("Mandir", mandirSchema);
export default Mandir;
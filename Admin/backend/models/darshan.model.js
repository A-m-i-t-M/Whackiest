import mongoose from "mongoose";

const darshanSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bhakt',
        required:true
    },
    mandir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Temple',
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    item:{
        type:String,
        required:true,
    }
})

const Darshan=mongoose.model("Darshan",darshanSchema)
export default Darshan
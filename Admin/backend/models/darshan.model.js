import mongoose from "mongoose";

const darshanSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bhakt',
        required:true
    },
    userName:{
        type: String,
        required: true,
    },
    mandir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Temple',
        required:true
    },
    mandirName:{
        type: String,
        required: true,
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true,
    }
})

const Darshan=mongoose.model("Darshan",darshanSchema)
export default Darshan
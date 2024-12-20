import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bhakt',
        required:true,
    },
    mandir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Temple',
        required:true,
    },
    pandit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purohit',
        required:true,
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
const Booking=mongoose.model("Booking",bookSchema)
export default Booking
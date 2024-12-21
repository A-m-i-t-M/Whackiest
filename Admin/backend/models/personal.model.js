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
    mandirName:{
        type: String,
        required:  true,
    },
    pandit:{
        type:String,
        
        required:true,
    },
    service:{
        type:String,
        
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
const Booking=mongoose.model("Booking",bookSchema)
export default Booking
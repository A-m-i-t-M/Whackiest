import mongoose from "mongoose"

const livestreamSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Temple',
        required:true,
    },
    link:{
        type:String,
        required:true,
    }
})
const Livestream=mongoose.model('Livestream',livestreamSchema)
export default Livestream;
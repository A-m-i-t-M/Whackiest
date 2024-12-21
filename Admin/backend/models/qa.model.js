import mongoose from "mongoose"

const qaSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bhakt',
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    mandir:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Temple',
        required:true
    },
    mandirName:{
        type:String,
        required:true,
    },
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        default:"",
    }
})

const QA=new mongoose.model("QA",qaSchema);
export default QA;
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true,
    },
    description: {
        type : String,
        required : true,
        unique : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
        // unique : true,
    }
}, {timestamps : true});

const Temple = mongoose.model("Temple", userSchema);
export default Temple;
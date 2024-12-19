import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
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

const Bhakt = mongoose.model("Bhakt", userSchema);
export default Bhakt;
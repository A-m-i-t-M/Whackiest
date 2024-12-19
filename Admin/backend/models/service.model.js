import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
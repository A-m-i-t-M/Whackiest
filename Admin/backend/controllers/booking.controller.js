import Booking from "../models/personal.model.js";


export const createBooking=async(req,res)=>{
    try{
        const {mandir,mandirName, pandit,service,date}= req.body;
        if(!mandir|| !mandirName ||!pandit||!service||!date){
            return res.status(404).json({ message: "Something is missing" });
        }
        const booking=new Booking({
            user:req.user._id,
            userName: req.user.username,
            mandir,
            mandirName,
            pandit,
            service,
            date,
        })
        await booking.save();
        res.status(201).json({ message: "Darshan created successfully", booking });
    }catch(error){
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
}

export const getBookings=async(req,res)=>{
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.status(200).json({bookings})
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching bookings", error: error.message });
      }
}

export const deleteBookings=async(req,res)=>{
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "booking ID is required.",
            });
        }

        const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "bookingn not found or you don't have access to it.",
            });
        }

        // Delete the snippet
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({
            success: true,
            message: "booking deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting darshan.",
            error: error.message,
        });
    }
}
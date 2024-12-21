import Booking from '../models/personal.model.js'

export const getAdminBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ mandir: req.user._id });
      res.status(200).json({bookings})
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching bookings", error: error.message });
    }
  }
  
export const cancelBooking= async(req,res)=>{
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            message: "booking ID is required.",
        });
    }

    const darshan = await Booking.findOne({ _id: bookingId });

    if (!darshan) {
        return res.status(404).json({
            success: false,
            message: "booking not found or you don't have access to it.",
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
        message: "Error deleting booking.",
        error: error.message,
    });
}
}
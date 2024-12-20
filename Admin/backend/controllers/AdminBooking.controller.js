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
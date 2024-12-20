import Darshan from '../models/darshan.model.js'

export const getAdminDarshans = async (req, res) => {
    try {
      const darshans = await Darshan.find({ mandir: req.user._id });
      res.status(200).json({darshans})
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching darshans", error: error.message });
    }
  };
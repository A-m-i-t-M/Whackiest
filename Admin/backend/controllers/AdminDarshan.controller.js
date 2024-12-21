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

export const cancelDarshan =async(req,res)=>{
  try {
    const { darshanId } = req.body;

    if (!darshanId) {
        return res.status(400).json({
            success: false,
            message: "darshan ID is required.",
        });
    }

    const darshan = await Darshan.findOne({ _id: darshanId });

    if (!darshan) {
        return res.status(404).json({
            success: false,
            message: "darshan not found or you don't have access to it.",
        });
    }

    // Delete the snippet
    await Darshan.findByIdAndDelete(darshanId);

    res.status(200).json({
        success: true,
        message: "darshan deleted successfully.",
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

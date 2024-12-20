import Darshan from "../models/darshan.model";

export const createDarshan = async (req, res) => {
  try {
    const { mandir, date, time, type, item } = req.body;
    if (!mandir || !date || !time || !type || !item) {
      return res.status(404).json({ message: "Something is missing" });
    }
    const darshan = new Darshan({
      user: req.user._id,
      mandir,
      date,
      time,
      type,
      item,
    });
    await darshan.save();
    res.status(201).json({ message: "Darshan created successfully", darshan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating darshan", error: error.message });
  }
};

export const getDarshans = async (req, res) => {
  try {
    const darshans = await Darshan.find({ user: req.user._id });
    res.status(200).json({darshans})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching darshans", error: error.message });
  }
};

export const deleteDarshan=async(req,res)=>{
    try {
        const { darshanId } = req.body;

        if (!darshanId) {
            return res.status(400).json({
                success: false,
                message: "Darshan ID is required.",
            });
        }

        const darshan = await Darshan.findOne({ _id: itemId, user: req.user._id });

        if (!darshan) {
            return res.status(404).json({
                success: false,
                message: "Idarshan not found or you don't have access to it.",
            });
        }

        // Delete the snippet
        await Darshan.findByIdAndDelete(darshanId);

        res.status(200).json({
            success: true,
            message: "Darshan deleted successfully.",
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
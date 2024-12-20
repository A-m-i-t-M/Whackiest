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

export const deleteDarshan=async
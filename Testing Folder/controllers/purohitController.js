// const Purohit = require('../models/Purohit');
import Purohit from '../models/Purohit';

export const createPurohit=async(req,res)=>{
    try{
        const {name,price}=req.body;
        if(!name||!price){
            return res.status(404).json({ message: 'Something is missing' });
        }
        const purohit = new Purohit({
            user: req.user._id, 
            name,
            price, 
        });
        await purohit.save();
        res.status(201).json({ message: 'Purohit created successfully', purohit});
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating purohit', error: error.message });
    }
}

export const getPurohits = async (req, res) => {
    try {
      const { userId } = req.body; 
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const purohits = await Purohit.find({ user: userId });
      if (!purohits.length) {
        return res.status(404).json({ message: "No Purohits found for this User ID" });
      }
      res.status(200).json({ purohits });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deletePurohit = async (req, res) => {
    try {
        const { purohitId } = req.body;

        if (!purohitId) {
            return res.status(400).json({
                success: false,
                message: "Purohit ID is required.",
            });
        }

        const purohit = await Purohit.findOne({ _id: purohitId, user: req.user._id });

        if (!purohit) {
            return res.status(404).json({
                success: false,
                message: "Purohit not found or you don't have access to it.",
            });
        }

        // Delete the snippet
        await Purohit.findByIdAndDelete(purohitId);

        res.status(200).json({
            success: true,
            message: "Purohit deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting purohit.",
            error: error.message,
        });
    }
};

// module.exports = {createPurohit,getPurohits,deletePurohit}
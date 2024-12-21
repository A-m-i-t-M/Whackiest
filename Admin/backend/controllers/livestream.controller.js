import Livestream from '../models/livestream.model.js'

export const createLivestream= async (req,res)=>{
    try{
        const {link}=req.body;
        if(!link){
            return res.status(404).json({ message: 'Something is missing' });
        }
        const live=new Livestream({
            user:req.user._id,
            link
        })
        await live.save();
        res.status(201).json({ message: 'Purohit created successfully', live});
    }catch(error){
        res.status(500).json({ message: "Error creating livestream", error: error.message });  
    }
}

export const getLivestream= async(req,res)=>{
    try {
        const { mandirId } = req.body; 
        if (!mandirId) {
          return res.status(400).json({ message: "Mandir ID is required" });
        }
        const live = await Livestream.find({ user: mandirId });
        if (!live.length) {
          return res.status(404).json({ message: "No livestream found for this User ID" });
        }
        res.status(200).json({ live });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
}

export const deleteLivestream=async(req,res)=>{
    try{
        // const live = await Livestream.findOne({ user: req.user._id });
        // if (!live) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Live not found or you don't have access to it.",
        //     });
        // }
        await Livestream.findOneAndDelete({user:req.user._id});
        res.status(200).json({
         success: true,
         message: "Purohit deleted successfully.",
    });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting livestream.",
            error: error.message,
        });
    }
}
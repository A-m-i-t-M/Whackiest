import Service from '../models/service.model.js';


export const createService=async(req,res)=>{
    try{
        const {name,price}=req.body;
        if(!name||!price){
            return res.status(404).json({ message: 'Something is missing' });
        }
        const service = new Service({
            user: req.user._id, 
            name,
            price, 
        });
        await service.save();
        res.status(201).json({ message: 'Service created successfully', item});
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
}

export const getServices = async (req, res) => {
    try {
      const { userId } = req.body; 
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const services = await Service.find({ user: userId });
      if (!services.length) {
        return res.status(404).json({ message: "No Items found for this User ID" });
      }
      res.status(200).json({ services });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.body;

        if (!serviceId) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required.",
            });
        }

        const item = await Service.findOne({ _id: serviceId, user: req.user._id });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Service not found or you don't have access to it.",
            });
        }

        // Delete the snippet
        await Service.findByIdAndDelete(itemId);

        res.status(200).json({
            success: true,
            message: "Item deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting item.",
            error: error.message,
        });
    }
};
import Item from '../models/item.model.js';

export const createItem=async(req,res)=>{
    try{
        const {name,price}=req.body;
        if(!name||!price){
            return res.status(404).json({ message: 'Something is missing' });
        }
        const item = new Item({
            user: req.user._id, 
            name,
            price, 
        });
        await item.save();
        res.status(201).json({ message: 'Item created successfully', item});
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
}

export const getItemsForAdmin=async(req,res)=>{
    try {
        const items = await Item.find({ user: req.user._id });// Find notebooks linked to the logged-in user
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
}

export const getItems = async (req, res) => {
    try {
      const { userId } = req.body; 
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const items = await Item.find({ user: userId });
      if (!items.length) {
        return res.status(404).json({ message: "No Items found for this User ID" });
      }
      res.status(200).json({ items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required.",
            });
        }

        const item = await Item.findOne({ _id: itemId, user: req.user._id });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found or you don't have access to it.",
            });
        }

        // Delete the snippet
        await Item.findByIdAndDelete(itemId);

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
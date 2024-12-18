const Mandir=require("../models/mandir")

const createMandir=async (req,res)=>{
    try{
        const {name,description,city,threshhold}=req.body;
        if(!name||!description||!city||!threshhold){
            return res.status(404).json({ message: 'Something is missing' });
        }
        const mandir = new Mandir({
            user: req.user._id, 
            name,
            description,
            city,
            threshhold, 
        });
        await mandir.save();
        res.status(201).json({ message: 'Mandir created successfully', mandir});
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating creating mandir', error: error.message });
    }
}

const deleteMandir=async (req,res)=>{
    try {
        const userId = req.user._id;
        const mandir = await Mandir.findOneAndDelete({ 
            user: userId 
        });
        if (!mandir) {
            return res.status(404).json({ 
                message: 'No mandir found for this user' 
            });
        }

        res.status(200).json({ 
            message: 'Mandir deleted successfully',
            deletedMandir: mandir
        });
    } catch (error) {
        console.error('Delete Mandir Error:', error);
        res.status(500).json({ 
            message: 'Error deleting mandir', 
            error: error.message 
        });
    }
}

module.exports={createMandir,deleteMandir}
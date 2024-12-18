const Mandir = require("../models/mandir");

const getAllMandirs = async (req, res) => {
    try {
        const mandirs = await Mandir.find().populate('user', 'name email');
        if (mandirs.length === 0) {
            return res.status(404).json({ 
                message: 'No mandirs found' 
            });
        }
        res.status(200).json({
            message: 'Mandirs retrieved successfully',
            count: mandirs.length,
            mandirs
        });
    } catch (error) {
        console.error('Get Mandirs Error:', error);
        res.status(500).json({ 
            message: 'Error retrieving mandirs', 
            error: error.message 
        });
    }
};
module.exports = {
    getAllMandirs,
    getMandirsByCity
};
import Temple from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";



export const signUP = async(req, res, next)=>{
    const {username, description, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newTemple = new Temple({username, description, email, password : hashedPassword});

    try{
        await newTemple.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json("New User Created Successfully!");
    }catch(error){
        next(errorHandler(401, 'User Already Exists!'));
    }
}

export const getAllTemples = async (req, res) => {
    try {
        const temples = await Temple.find({}, 'username description'); // Fetch only username and description fields
        res.status(200).json({ temples });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching temples', error: error.message });
    }
};

export const signIN = async (req, res, next)=>{
    const {email, password} = req.body;
    try {
        const validTemple = await Temple.findOne({email});
        if(!validTemple){
            return next(errorHandler(404, 'Invalid Username / Password'));
        }

        const validPassword = bcrypt.compareSync(password, validTemple.password);
        if(!validPassword){
            return next(errorHandler(401, 'Invalid Username / Password'));
        }

        const token = jwt.sign({_id : validTemple._id}, process.env.JWT_SECRET);
        const {password : pass, ...remaining} = validTemple._doc;
        
        res.cookie('access_token', token, 
                    {
                        httpOnly : true,
                        // expires : new Date(Date.now() + 6000000)
                    })
            .status(200)
            // .json(validUser)
            .json(remaining);

    } catch (error) {
        next(error);
    }
};

export const signOut = async(req,res,next)=>{
    try{
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out");
    }catch(error){
        next(error);
    }
};
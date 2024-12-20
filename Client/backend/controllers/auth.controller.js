import Bhakt from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signUP = async(req, res, next)=>{
    const {username, email, password} = req.body;
    console.log("a");
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("b");
    const newBhakt = new Bhakt({username, email, password : hashedPassword});
    console.log("c");
    
    try{
        await newBhakt.save();
        console.log("d");
        
        res.setHeader('Content-Type', 'application/json');
        console.log("e");
        res.status(201).json("New User Created Successfully!");
        console.log("f");
        }catch(error){
            next(errorHandler(401, 'User Already Exists!'));
        }
}

export const signIN = async(req, res, next)=>{
    const {email, password} = req.body;
    try{
        const validBhakt = await Bhakt.findOne({email});
        if(!validBhakt){
            return next(errorHandler(401, 'Invalid Username / Password'));
        }

        const token = jwt.sign({_id : validBhakt.id}, process.env.JWT_SECRET);
        const {password : pass, ...remaining} = validBhakt._doc;

        res.cookie('access_token', token,
            {
                httpOnly : true,
            }
            .status(200)
            .json(remaining)
        );
    }catch(error){
        next(error);
    }
}

export const signOut = async(req,res,next)=>{
    try{
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out");
    }catch(error){
        next(error);
    }
};
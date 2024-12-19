import jwt from 'jsonwebtoken';
import Temple from '../models/user.model.js'; // Adjust the path if needed
import { errorHandler } from '../utils/error.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies?.access_token;
        if (!token) {
            return next(errorHandler(401, 'Authentication token missing.'));
        }

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Temple.findById(decoded._id).select('-password'); // Fetch user without password

        if (!user) {
            return next(errorHandler(404, 'User not found.'));
        }

        // Attach user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        next(errorHandler(401, 'Invalid or expired token.'));
    }
};

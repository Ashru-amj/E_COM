

import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            error,
            message: "Error verifying JWT"
        });
    }
};

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user || user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            error,
            message: "Error in Admin middleware"
        });
    }
};

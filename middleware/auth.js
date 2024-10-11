const JWT  = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try {
        // Get token
        const token = req.body.token || req.cookies.token || (req.header("Authorization") || "").replace("Bearer", "").trim();

        // If token is missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        // Verify the token
        try {
            const decode = JWT.verify(token, process.env.JWT_SECRET);
            console.log("token", decode);
            req.user = decode;
        } catch (error) {
            // Verification issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifing token"
        })
    }
}

// Student middleware
exports.isStudent = async(req, res, next) => {
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Student"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This person is not a Student"
        })
    }
}

// Super Admin middleware
exports.isSuperAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== "SuperAdmin"){
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Super Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This person is not a Super Admin"
        })
    }
}

// Admin middleware
exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This person is not a Admin"
        })
    }
}
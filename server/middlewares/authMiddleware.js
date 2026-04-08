import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { User } from "../models/user.js";


//----------------------------------//
// AUTHENTICATION MIDDLEWARE LOGIC	//
//----------------------------------//
export const isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return next(new ErrorHandler("Please login to access this resource", 401));
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id).select(
			"-resetPasswordToken -resetPasswordExpire"
		);

		if (!req.user) {
			return next(new ErrorHandler("User not found with this ID.", 404));
		}

		next();
	} catch (error) {
		return next(new ErrorHandler("Invalid or expired token", 401));
	}
};


//----------------------//
// AUTHORIZATION LOGIC	//
//----------------------//

export const isAuthorized = (...roles) => { 
	return (req, res, next) => { 
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role: ${req.user.role} is not allowed to access this resource`,
					403
				)
			);
		}
		next();
	};
};
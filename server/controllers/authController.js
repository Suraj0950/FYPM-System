import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
import crypto from 'crypto';
import { sendEmail } from "../services/emailServices.js";

//----------------//
// REGISTER USER  //
//----------------//
export const registerUser = asyncHandler( async (req, res, next) =>{
	const { name, email, password, role } = req.body;
	if (!name || !email || !password){
		return next(new ErrorHandler("Please fill all the required details", 400));
	}

	let user = await User.findOne({ email });

	if (user){
		return next(new ErrorHandler("User already exists", 400));  
	}

	user = new User({
		name,
		email,
		password,
		role
	});
	await user.save();
	generateToken(user, 201, res, "User Registered Successfully");
});

//---------------------//
//     LOGIN USER 	   //
//---------------------//
export const login = asyncHandler( async (req, res, next) =>{

	const { email, password, role } = req.body;

	if ( !email || !password || !role ) {
		return next(new ErrorHandler("Please provide all required field", 400));
	}

	const user = await User.findOne({email, role}).select("+password");

	if(!user) {
		return next(new ErrorHandler("Invalid email, password or role", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email, password or role", 401));	
	}

	generateToken(user, 200, res, "Logged in Successfully");
});
 
//----------------//
//  LOGOUT USER   //
//----------------//
export const logout = asyncHandler( async (req, res, next) =>{
	res
       .status(200)
	   .cookie("token", "", {
	    expires:new Date(Date.now()),
	    httpOnly: true,
    })
	.json({
		success:true,
		message: "Logout Successfully"
	})
});

//------------------//
//    GET USER      //
//------------------//
export const getUser = asyncHandler( async (req, res, next) =>{
	const user = req.user;
	res.status(200).json({
		success: true,
		user,
	})
});

//-------------------------//
//    FORGOT PASSWORD      //
//-------------------------//
export const forgotPassword = asyncHandler( async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}

	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
	
	const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

	try {
		await sendEmail({
		to: user.email,
		subject: "FYPM-SYSTEM ~ 🔐  Password Reset Request",
		message,
	});
	res
	  .status(200)
	  .json({
		success: true,
		message: `Email sent to ${user.email} successfully`,
	});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message || "Cannot Send Email", 500))	
	}
	
});

//--------------------//
//   RESET PASSWORD   //
//--------------------//
export const resetPassword = asyncHandler( async (req, res, next) => {
	const { token } = req.params;

	const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {$gt: Date.now()},
	});

	if(!user) { 
		return next(new ErrorHandler("Invalid or expired password reset token", 400));
	}

	const { password, confirmPassword } = req.body;

	if(!password || !confirmPassword) {
		return next(new ErrorHandler("Please provide all required fields", 400));
	}
	if(password !== confirmPassword) {
		return next(new ErrorHandler("Password and Confirm Password do not match", 400));
	}

	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	generateToken(user, 200, res, "Password reset successfully");
});


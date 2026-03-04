import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		trim: true,
		maxlength: [30, "Name cannot excxceed 30 characters"]
	},
	email: { 
		type: String,
		required: [true, "Email is required"],
		unique: true,
		lowercase: true,
		maxlength: [30, "email cannot excxceed 30 characters"],
		match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please fill a valid email address"]
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
		minlength: [8, "Password must be atleast 8 characters long!"]
	},
	role: {
		type: String,
		default: "Student",
		enum: ["Student", "Teacher", "Admin"]
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,

	department: {
		type: String,
		trim: true,
		default: null
	},
	expertise: {
		type: [String],
		default: [],
	},
	maxStudents: {
		type: Number,
		default: 10,
		min: [1, "Min Students must be atleast 1"]
	},
	assignedStudents: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null
		}
	],
		supervisor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			default: null
		},
}, {
	timestamps: true,
});

userSchema.pre("save", async function(){
	if (!this.isModified("password")) {
		return ;
	} 
	this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.generateToken = function() {
	return jwt.sign(
		{ id: this._id },process.env.JWT_SECRET,{ 
		expiresIn: process.env.JWT_EXPIRE 
	});
};

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {

	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};



export const User = mongoose.model("User", userSchema);


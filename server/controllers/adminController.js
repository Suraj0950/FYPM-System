import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import * as userServices from "../services/userServices.js";

export const createStudent = asyncHandler(async (req, res, next) => {
    const { name, email, password, department } = req.body;
    if ( !name || !email || !password ||!department ) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const user = await userServices.createUser({
        name,
        email,
        password,
        department,
        role: "Student",
    });
    res.status(201).json({
        success: true,
        message: "Student created Successfully",
        data: { user },
    });
});

export const updateStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.role; // Prevent role updation

    const user = await userServices.updateUser(id, updateData);
    if (!user) {
        return next(new ErrorHandler("Student Not Found!", 404));
    }
    res.status(200).json({
        success: true,
        message: "Student updated Successfully",
        data: { user },
    });
});

export const deleteStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (!user) {
        return next(new ErrorHandler("Student Not Found!", 400));
    }

    if (user.role !== "Student") {
        return next(new ErrorHandler("User is not a student", 400));
    }

    await userServices.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Student deleted Successfully",

    })
});

export const createTeacher = asyncHandler(async (req, res, next) => {
    const { name, email, password, department, maxStudents, expertise } = req.body;
    if ( !name || !email || !password ||!department || !maxStudents ||!expertise ) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const user = await userServices.createUser({
        name,
        email,
        password,
        department,
        maxStudents,
        expertise: Array.isArray(expertise)
            ? expertise
            : typeof expertise === "string" && expertise.trim() !== ""
            ? expertise.split(",").map(s => s.trim())
            : [],
        role: "Teacher",
    });
    
    res.status(201).json({
        success: true,
        message: "Student created Successfully",
        data: { user },
    });
});

export const updateTeacher = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.role; // Prevent role updation

    const user = await userServices.updateUser(id, updateData);
    if (!user) {
        return next(new ErrorHandler("Teacher Not Found!", 404));
    }
    res.status(200).json({
        success: true,
        message: "Teacher updated Successfully",
        data: { user },
    });
});

export const deleteTeacher = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (!user) {
        return next(new ErrorHandler("Teacher Not Found!", 400));
    }

    if (user.role !== "Student") {
        return next(new ErrorHandler("User is not a teacher", 400));
    }

    await userServices.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Teacher deleted Successfully",

    })
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userServices.getAllUsers();
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: { users },
    });
});

export const assignSupervisor = asyncHandler(async (req, res, next) => {});
export const getAllProject = asyncHandler(async (req, res, next) => {});
export const getDashboardStats = asyncHandler(async (req, res, next) => {});

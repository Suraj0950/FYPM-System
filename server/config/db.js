import mongoose from "mongoose";

//-----------------------------//
//  DATABASE CONNECTION LOGIC  //
//-----------------------------//
export const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "FYPM-System"
    }).then(() => {
        console.log("Database Connected 🤞")
    }).catch( err => {
        console.log("Database Connection Failed ☠️", err)
    })
};
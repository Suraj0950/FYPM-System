import app from './app.js';
import { connectDB } from './config/db.js';
 
//----------------------//
// DATABASE CONNECTION  //
//----------------------//
connectDB()

//------------------//
// SERVER STARTING  //
//------------------//
const PORT = process.env.PORT;
const server = app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT} 😃`)
});

//------------------//
// ERROR HANDLING   //
//------------------//
process.on("unhandledRejection",(err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException",(err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    server.close(() => process.exit(1));
});

export default server;
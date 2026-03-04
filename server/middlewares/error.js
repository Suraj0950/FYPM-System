// Jai Bajrang Bali Error ko ache se handle karna....

//------------------------//
//  ERROR HANDLER CLASS   //
//------------------------//
class ErrorHandler extends Error {
	constructor(message, statusCode){
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
};


//------------------------//
//    ERROR MIDDLEWARE    //
//------------------------//
export const errorMiddleware = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";
	

	// DUPLICATE KEY ERROR
	if (err.code === 11000 ){
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		err = new ErrorHandler(message, 400);
	}

	// JWT TOKEN ERROR
	if (err.name === "JsonWebTokenError"){
		const message = "Json Web Token is Invalid, Try again!";
		err = new ErrorHandler(message, 400);
	}

	// JWT TOKEN EXPIRED ERROR
	if (err.name === "TokenExpiredError"){
		const message = "Json Web Token is Expired, Try again!";
		err = new ErrorHandler(message, 400);
	}   

	// CAST ERROR
	if (err.name === "CastError"){
		const message = "Resource not found! Invalid:" + err.path;
		err = new ErrorHandler(message, 400);
	}     

	// ERROR MESSAGE FOR DEBUGGING
	const errorMessage = err.errors
	? Object.values(err.errors)
		.map((value) => value.message)
		.join(",")
	: err.message;

	return res.status(err.statusCode).json({
		success: false,
		message: errorMessage
		
	});

};

export default ErrorHandler;

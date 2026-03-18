
const generateToken = (user, statusCode, res, message) => {
    const token = user.generateToken();
    res
    .status(statusCode)
    .cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,  
        secure: false,
        sameSite: "lax"
    })
    .json({
        success: true,
        message: message,
        token: token,
        user,
    });
};

export default generateToken;
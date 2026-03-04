//-----------------------//
// ASYNC HANDLER LOGIC   //
//-----------------------//

const asyncHandler = (Func) => (req, res, next) => {
    Promise.resolve(Func(req, res, next)).catch(next);
}

export default asyncHandler;




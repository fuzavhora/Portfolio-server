const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
}

module.exports = asyncHandler;
// This function takes a request handler as an argument and returns a new function that handles the request.
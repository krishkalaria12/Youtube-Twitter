const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err));
    }
}

// This code defines a function asyncHandler that acts as a wrapper around an asynchronous request handler function in a Node.js environment. It is commonly used for handling asynchronous operations, such as database queries or API calls, within route handlers or middleware functions.

export {asyncHandler}

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

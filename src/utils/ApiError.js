class ApiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

// example of where it can be used

// try {
//     // Some code that may throw an error
//     throw new ApiError(404, "Resource not found");
// } catch (error) {
//     if (error instanceof ApiError) {
//         // Handle the API error
//         console.log(`API Error: ${error.statusCode} - ${error.message}`);
//     } else {
//         // Handle other types of errors
//         console.error(error);
//     }
// }

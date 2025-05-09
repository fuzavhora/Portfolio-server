class ApiError extends Error {
    constructor(
      statusCode,                          // HTTP status code (e.g., 400, 500)
      message = "Something went wrong!",   // Default error message
      errors = [],                         // Array of detailed errors (optional)
      stack = ""                           // Optional custom stack trace
    ) {
      super(message);                      // Call the built-in Error constructor with the message
  
      this.statusCode = statusCode;        // Set the HTTP status code
      this.data = null;                    // Optional field to attach extra data
      this.message = message;              // Explicitly store the message
      this.success = false;                // Flag to indicate request failure
      this.errors = errors;                // Store any detailed errors
  
      if (stack) {
        this.stack = stack;                // Use provided stack trace if available
      } else {
        Error.captureStackTrace(this, this.constructor); // Capture stack trace from this point
      }
    }
  }
  
  module.exports = ApiError;               // Export the class for use in other modules
  
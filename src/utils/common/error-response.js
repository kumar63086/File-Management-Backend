function errorResponse(status, message, error = {}) {
    return {
        status: "error",
        message,
        data: {},
        error,
        code: status
    };
}

module.exports = errorResponse;
function successResponse(status, message, data = {}) {
    return {
        status: "success",
        message,
        data,
        error: {},
        code: status
    };
}

module.exports = successResponse;
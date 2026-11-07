export const successResponse = (res,statusCode = 200, data = null, message = '') => {
    return res.status(statusCode).json({
        success: true,
        data,
        message
    });
};

export const errorResponse =(res,statusCode = 400, error = null, message = '') => {
    return res.status(statusCode).json({
        success: false,
        error,
        message
    });
};
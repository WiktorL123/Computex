export const errorHandler = (err, req, res, next) => {
    console.error('--------- MIDDLEWARE BLEDU ------------------');


    const statusCode = err.status || 500;

    const errorResponse = {
        message: err.message || 'Something went wrong',
        statusCode: statusCode,
        details: err.details || null,
        enviorment: process.env.NODE_ENV || 'production',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };

    res.status(statusCode).json(errorResponse);
};

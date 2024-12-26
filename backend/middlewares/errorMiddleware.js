export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : err.statusCode;
    res.status(statusCode).json({
        message: err.message,
        statusCode: statusCode,
        enviorment: process.env.NODE_ENV,
        stack: process.env.NODE_ENV==='development' ?  err.stack : ''
    })
}

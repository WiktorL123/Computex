export const errorHandler = (err, req, res, next) => {
    console.error('--------- MIDDLEWARE BLEDU ------------------');
    console.error(err.stack);

    // Jeśli statusCode nie został ustawiony, domyślnie ustaw 500
    const statusCode = err.status || 500;

    // Przygotowanie odpowiedzi błędu
    const errorResponse = {
        message: err.message || 'Something went wrong',
        statusCode: statusCode,
        details: err.details || null, // Szczegóły dostarczone w błędzie lub null
        enviorment: process.env.NODE_ENV || 'production',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Stacktrace tylko w trybie development
    };

    res.status(statusCode).json(errorResponse);
};

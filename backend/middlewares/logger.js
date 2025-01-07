
export const logger = (req, res, next) => {
    const {url, method} = req
    const timestamp = new Date().toISOString();
    const body = JSON.stringify(req.body);

    res.on('finish', () => {
        const status = res.statusCode
        console.log(`request on url: ${url} with method: ${method}
    body: ${body} time: ${timestamp} status: ${status}`);
    })
    next()

}

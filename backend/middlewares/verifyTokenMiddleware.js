import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(403).json({ error: "Access denied" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(403).json({ error: "Access denied" });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next()

    }
    catch (error) {
        return res.status(500).json({error: 'invalid or expired token'});
    }
}
export const checkRole = (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !=='admin') {
            return res.status(403).json({error: 'Access denied'});
        }
        next()
    }
    catch (error) {
        return res.status(500).json({error: error});
    }
}
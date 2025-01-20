export const checkRole = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            console.error("No user in request");
            return res.status(403).json({ error: "Access denied: No user found" });
        }
        console.log(user.role);
        if (user.role !== "admin") {

            return res.status(403).json({ error: "Access denied: Insufficient permissions" });
        }

        next();
    } catch (error) {
        console.error("Error in checkRole:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

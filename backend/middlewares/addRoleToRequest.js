import { User } from "../models/User.js";

export const addRoleToRequest = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: "User ID is missing from token payload" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user.role = user.role;

        console.log("Role added to user:", req.user.role);

        next();
    } catch (error) {
        console.error("Error in addRoleToUser middleware:", error);
        return res.status(500).json({ error: "Server error while adding role to user" });
    }
};

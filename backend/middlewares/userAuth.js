import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = decoded.id;

        next();
    } catch (error) {
        console.error("Authorization Error:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authUser;
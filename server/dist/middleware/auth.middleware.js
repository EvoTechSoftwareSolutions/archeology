import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
export function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Authentication required");
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
}

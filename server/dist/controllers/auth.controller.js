import { authService } from "../services/auth.services.js";
class AuthController {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const result = await authService.login(req.body.email, req.body.password);
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // GET /auth/me
    async getMe(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                data: req.user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /auth/logout
    async logout(req, res, next) {
        try {
            await authService.logout();
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export const authController = new AuthController();

import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async register(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }
        const hashedPassword = await hashPassword(data.password);
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            department: data.department,
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
            isActive: user.isActive,
        };
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }
        if (!user.isActive) {
            throw new ApiError(401, "User is not active");
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                department: user.department,
                role: user.role,
            },
        };
    }
    async logout() {
        return true;
    }
}
export const authService = new AuthService();

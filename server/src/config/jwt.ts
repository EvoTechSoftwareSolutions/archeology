import type { SignOptions } from "jsonwebtoken";

export const jwtConfig = {
    secret: process.env.JWT_SECRET as string,

    expiresIn: "7d" as SignOptions["expiresIn"]
};
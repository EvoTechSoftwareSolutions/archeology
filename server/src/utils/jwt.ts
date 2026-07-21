import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt.js";

interface JwtPayload {
  id: number;

  email: string;

  role: string;
}

export function generateToken(payload: JwtPayload) {
  return jwt.sign(
    payload,

    jwtConfig.secret,

    {
      expiresIn: jwtConfig.expiresIn,
    },
  );
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,

    jwtConfig.secret,
  );
}

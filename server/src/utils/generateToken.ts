import jwt from 'jsonwebtoken';
import type { Response } from 'express';

const generateToken = (res: Response, userId: number, role: string) => {
  const secret = process.env.JWT_SECRET || 'secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';

  const token = jwt.sign({ userId, role }, secret, {
    expiresIn: expiresIn as any,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;

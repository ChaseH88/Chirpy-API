import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

export const signToken = (userId: string, expiresIn: string = '1h'): string =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn });

export const decodeToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { userId: string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

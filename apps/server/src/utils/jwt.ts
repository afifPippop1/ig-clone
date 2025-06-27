import jwt from 'jsonwebtoken';
import { env } from '~/lib/env';

export class JWT {
  static decode(token: string) {
    try {
      const extractedToken = this.getToken(token);
      return jwt.verify(extractedToken || '', env.JWT_SECRET);
    } catch {
      return '';
    }
  }

  static encode(payload: object, options?: jwt.SignOptions) {
    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  static getToken(token: string) {
    if (!token) {
      return null;
    }
    const parts = token.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }
    return parts[1];
  }
}

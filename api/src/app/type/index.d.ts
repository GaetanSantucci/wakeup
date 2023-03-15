/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { CustomerType } from './user.js';

export { };

declare global {
  namespace Express {
    export interface Request {
      user?: CustomerType | null;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    token?: string;
    refreshToken?: string | string[];
  }

  interface Session {
    destroy(): void;
  }
}
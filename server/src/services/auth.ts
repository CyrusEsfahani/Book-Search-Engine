import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();


interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if(req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }
  if(!token) {
    return req
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '', {maxAge: '3h'});
    req.user = decoded as JwtPayload;
  } catch (error) {
    console.log(error);

  }

  return req;
}

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({data: payload}, secretKey, { expiresIn: '4h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};


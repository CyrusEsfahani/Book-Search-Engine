import type { Request } from 'express';
import type IJwtpayload from './JwtPayload.js';

export default interface IUserAuthRequest extends Request {
    user: IJwtpayload;
}

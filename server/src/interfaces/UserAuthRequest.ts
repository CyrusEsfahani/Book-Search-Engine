import type { Request } from 'express';
import type IJwtPayload from './JwtPayload';





export default interface IUserAuthRequest extends Request {
    user: IJwtPayload;

}

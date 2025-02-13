import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    userData?: {
        userId: string;
        rol: string;
    };
}
declare const authenticate: (allowedRoles: string[]) => (req: CustomRequest, res: Response, next: NextFunction) => void;
export default authenticate;

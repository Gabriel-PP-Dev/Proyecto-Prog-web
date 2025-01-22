import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  userData?: { userId: string; rol: string };
}

const authenticate = (allowedRoles: string[]) => {
  return function (req: CustomRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).json({ message: 'Necesita iniciar sesión' });
      return;
    }
    try {
      const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET as string) as any;
      req.userData = { userId: decodedToken.userId, rol: decodedToken.rol };
      
      if (!allowedRoles.includes(decodedToken.rol)) {
        res.status(403).json({ message: 'Permiso denegado. El rol del usuario no tiene acceso al servicio' });
        return;
      }

      next();
    } catch (error) {
      res.status(403).json({ message: 'Permiso denegado' });
    }
  };
};

export default authenticate;
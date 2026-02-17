import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth.js";
import { Role } from "../../generated/prisma/enums.js";


// export enum UserRole {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
        image: string | null | undefined ;
      };
    }
  }
}

const authMiddleWare = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sasstion = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      if (!sasstion) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized! Please Logine Then Try",
        });
      }

      req.user = {
        id: sasstion.user.id,
        email: sasstion.user.email,
        name: sasstion.user.name,
        role: sasstion.user.role as string,
        emailVerified: sasstion.user.emailVerified,
        image: sasstion.user.image,
      };
        
        
        
           if (roles.length && !roles.includes(req.user.role as Role)) {
             return res.status(403).json({
               success: false,
               message:
                 "Forbidden! You don't have permission to access this resources!",
             });
           }

     
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default authMiddleWare;

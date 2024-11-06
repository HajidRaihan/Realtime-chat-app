import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "***";

declare module "express-serve-static-core" {
  interface Request {
    user?: string;
  }
}

export const verifyUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorize" });
      return;
    }

    try {
      const decode = jwt.verify(token, secret);
      req.user = (decode as any).id;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
  };
};

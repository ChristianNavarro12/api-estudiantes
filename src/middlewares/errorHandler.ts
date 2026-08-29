import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Ya existe un registro con ese valor único" });
    }
  }

  res.status(500).json({ message: "Error interno del servidor" });
}
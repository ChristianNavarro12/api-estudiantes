import { Response } from "express";

interface SuccessOptions {
  message: string;
  data?: unknown;
  status?: number;
}

export function sendSuccess(res: Response, { message, data, status = 200 }: SuccessOptions) {
  return res.status(status).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
}
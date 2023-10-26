import { ErrorRequestHandler } from 'express';
import { CustomError } from 'tsmaker-common';
import { ZodError } from 'zod';

class ErrorHandler {
  readonly errorHandler: ErrorRequestHandler = async (
    error,
    req,
    res,
    next,
  ) => {
    if (error instanceof CustomError) {
      return res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }

    if (error instanceof ZodError) {
      const zodErrors: Record<string, string> = {};

      error.issues.forEach((zodError) => {
        const [path] = zodError.path;
        zodErrors[path ?? 'error'] = zodError.message;
      });

      return res.status(400).json({
        status: 400,
        message:
          'The request data is missing or invalid. Please check your input and try again',
        errors: zodErrors,
      });
    }

    if (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }

    next();
  };
}

export const errorHandler = new ErrorHandler().errorHandler;

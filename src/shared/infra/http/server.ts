import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { log } from '@config/logger';
import { AppError } from '@shared/errors/AppError';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(PORT, () => {
  log.info(`🚀 Server started on port ${PORT}`);
});

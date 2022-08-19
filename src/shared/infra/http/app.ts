import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import { AppError } from '@shared/errors/AppError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import '@shared/container';

import { router } from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

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

export { app };

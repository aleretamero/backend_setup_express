import express, { Express } from 'express';
import { resolve } from 'path';

import cors from 'cors';
import { corsOptions } from './middlewares/Cors';

import { errorHandler } from './middlewares/ErrorHandler';

import { todoRouter } from './app/todo/todo.route';

class App {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.render(resolve(__dirname, 'views')));
    this.app.use('/todo', todoRouter);
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'public')));
    this.app.use(cors(corsOptions));
  }

  private errorHandler(): void {
    this.app.use(errorHandler);
  }
}

export const app = new App().app;

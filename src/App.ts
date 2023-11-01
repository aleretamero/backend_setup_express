import express, { Express } from 'express';
import { resolve } from 'path';

class App {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.render(resolve(__dirname, 'views')));
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'public')));
  }
}

export const app = new App().app;

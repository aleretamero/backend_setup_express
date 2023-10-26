import { CorsOptions } from 'cors';

class Cors {
  public readonly corsOptions: CorsOptions;
  private readonly whiteList: string[];

  constructor() {
    this.whiteList = this.getOrigins();

    this.corsOptions = {
      origin: (origin, callback) => {
        if ((origin && this.whiteList.includes(origin)) ?? !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    };
  }

  private getOrigins() {
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    if (process.env.NODE_ENV === 'production') {
      return [];
    }

    return [];
  }
}

export const corsOptions = new Cors().corsOptions;

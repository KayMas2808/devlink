import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${req.method}] ${req.url}`);

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.log(
          `[ERROR] ${req.method} ${req.url} - Status: ${req.statusCode}`,
        );
      }
    });

    next();
  }
}

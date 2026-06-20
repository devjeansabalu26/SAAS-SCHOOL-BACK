import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { v4 as uuid } from 'uuid';

@Injectable()
export class RequestIdMiddleware
  implements NestMiddleware
{
  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const requestId = uuid();

    req.headers['x-request-id'] = requestId;

    res.setHeader(
      'x-request-id',
      requestId,
    );

    next();
  }
}
import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.auth = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    const [strategy, token] = auth.split(' ');
    if (!strategy) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().auth.user;
  },
);

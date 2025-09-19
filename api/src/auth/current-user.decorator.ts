import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from 'jose';

export const CurrentUser = createParamDecorator(
  (data: keyof JWTPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!data) {
      return request.user;
    }

    return request.user?.[data];
  },
);

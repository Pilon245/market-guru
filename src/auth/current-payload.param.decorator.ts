import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user?.id) throw new Error('JwtGuard must be used');
    return { id: request.user.id };
  },
);

/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Post, Type, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiPost(
  path: string,
  {
    description,
    type,
    useAuthGuard = true,
  }: {
    description: string;
    type: Type<unknown> | Function | [Function] | string;
    useAuthGuard?: boolean;
  },
): MethodDecorator {
  return applyDecorators(
    Post(path),
    ApiOperation({ description: description }),
    ApiCreatedResponse({ type: type }),
    ...(useAuthGuard ? [ApiBearerAuth(), UseGuards(AuthGuard())] : []),
  );
}

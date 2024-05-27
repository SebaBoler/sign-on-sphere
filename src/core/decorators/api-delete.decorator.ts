/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Delete, Type, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function ApiDelet(
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
    Delete(path),
    ApiOperation({ description: description }),
    ApiOkResponse({ type: type }),
    ...(useAuthGuard ? [ApiBearerAuth(), UseGuards(AuthGuard())] : []),
  );
}

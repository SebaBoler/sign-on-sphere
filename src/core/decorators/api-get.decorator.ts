/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, Get, Type, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiPaginationResponse } from '@src/core/decorators/api-pagination-response.decorator';

export function ApiGet(
  path: string,
  {
    description,
    type,
    isPagination = false,
    useAuthGuard = true,
  }: {
    description: string;
    type: Type<unknown> | Function | [Function] | string;
    isPagination?: boolean;
    useAuthGuard?: boolean;
  },
): MethodDecorator {
  return applyDecorators(
    Get(path),
    ApiOperation({ description: description }),
    ...(isPagination ? [ApiPaginationResponse({ type: type as string | Function })] : [ApiOkResponse({ type: type })]),
    ...(useAuthGuard ? [ApiBearerAuth(), UseGuards(AuthGuard())] : []),
  );
}

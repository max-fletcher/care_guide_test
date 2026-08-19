import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { TRBACRoles } from '../enums/roles.enums'

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  return request.user
})

export type TCurrentUser = {
  id: string
  role: TRBACRoles
}

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { ROLES_KEY } from '../decorators/RBAC/roles.decorator'
import { JwtPayload } from 'src/types/tokens.types'
import { TRBACRoles } from '../enums/roles.enums'

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get required roles and permissions from decorators
    const requiredRoles = this.reflector.getAllAndOverride<TRBACRoles[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    // if no roles or permissions required, allow access
    if (!requiredRoles || requiredRoles.length === 0) return true

    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as JwtPayload
    if (!user || !user.role || !requiredRoles.includes(user.role)) throw new ForbiddenException('Access denied.')

    return true
  }
}

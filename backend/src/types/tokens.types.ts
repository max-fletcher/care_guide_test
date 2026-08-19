import { TRBACRoles } from 'src/common/enums/roles.enums'

export type JwtPayload = {
  sub: string
  email: string
  role: TRBACRoles
}

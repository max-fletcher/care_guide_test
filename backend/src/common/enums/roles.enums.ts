export enum TRBACRoles {
  ADMIN = 'admin',
  USER = 'user'
}

export const TRBACRolesList = [TRBACRoles.ADMIN, TRBACRoles.USER] as const

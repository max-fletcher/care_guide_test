import { SetMetadata } from '@nestjs/common'
import { TRBACPermission } from 'src/common/enums/permissions.enums'

export const PERMISSIONS_KEY = 'permissions'
export const Permissions = (...permissions: TRBACPermission[]) => SetMetadata(PERMISSIONS_KEY, permissions)

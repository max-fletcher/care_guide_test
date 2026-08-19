export enum TGetUsersPaginateFields {
  NAME = 'name',
  EMAIL = 'email',
  ROLE = 'role',
  CREATED_AT = 'createdAt'
}

export const GET_USERS_PAGINATED_FIELDS = [
  TGetUsersPaginateFields.NAME,
  TGetUsersPaginateFields.EMAIL,
  TGetUsersPaginateFields.ROLE,
  TGetUsersPaginateFields.CREATED_AT
] as const

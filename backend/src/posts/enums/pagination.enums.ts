export enum TGetPostsPaginateFields {
  TITLE = 'title',
  CREATED_AT = 'createdAt'
}

export const GET_POSTS_PAGINATED_FIELDS = [TGetPostsPaginateFields.TITLE, TGetPostsPaginateFields.CREATED_AT] as const

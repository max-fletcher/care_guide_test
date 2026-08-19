export enum TGetNotesPaginateFields {
  TITLE = 'title',
  CREATED_AT = 'createdAt'
}

export const GET_NOTES_PAGINATED_FIELDS = [TGetNotesPaginateFields.TITLE, TGetNotesPaginateFields.CREATED_AT] as const

import { z } from 'zod'

export const CreateNoteSchema = z.object({
  title: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Title is required.' : 'Title must be a string.')
    })
    .min(3, 'Title must be at least 3 characters')
    .max(300),
  content: z.string({
    error: (issue) => (issue.input === undefined ? 'Content is required.' : 'Content must be a string.')
  })
})

export type TCreateNoteZodValDto = z.infer<typeof CreateNoteSchema>
export type TCreateNoteBodyDto = TCreateNoteZodValDto

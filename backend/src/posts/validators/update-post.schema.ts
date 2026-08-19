import { z } from 'zod'

export const UpdatePostSchema = z.object({
  title: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Title is required.' : 'Title must be a string.')
    })
    .min(3, 'Title must be at least 3 characters')
    .max(300)
    .optional(),
  content: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Content is required.' : 'Content must be a string.')
    })
    .optional(),
  author: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Author id is required.' : 'Author id must be a string.')
    })
    .optional()
})

export type TUpdatePostZodValDto = z.infer<typeof UpdatePostSchema>
export type TUpdatePostBodyDto = TUpdatePostZodValDto

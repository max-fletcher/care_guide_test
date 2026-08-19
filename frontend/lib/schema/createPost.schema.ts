import { z } from 'zod'

export const CreatePostSchema = z.object({
  title: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Title is required.' : 'Title must be a string.')
    })
    .nonempty({ error: 'Title is required.' }),
  content: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Content is required.' : 'Content must be a string.')
    })
    .nonempty({ error: 'Content is required.' }),
  author: z.string().optional()
})

export type TCreatePost = z.infer<typeof CreatePostSchema>

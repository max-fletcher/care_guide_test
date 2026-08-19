import { TRBACRoles } from 'src/common/enums/roles.enums'
import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Name is required.' : 'Name must be a string.')
    })
    .min(3, 'Name must be at least 3 characters')
    .max(300),
  email: z.string({
    error: (issue) => (issue.input === undefined ? 'Email is required.' : 'Email must be a string.')
  }),
  password: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Password is required.' : 'Password must be a string.')
    })
    .min(8, 'Password must be at least 8 characters.')
    .max(50),
  role: z.enum(TRBACRoles).default(TRBACRoles.USER),
  interests: z.array(z.string().min(1)).default([])
})

export type TCreateUserZodValDto = z.infer<typeof CreateUserSchema>
export type TCreateUserBodyDto = TCreateUserZodValDto

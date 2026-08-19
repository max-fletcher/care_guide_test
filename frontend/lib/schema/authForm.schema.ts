import { EmailRegex } from '@/constants/zod-validation'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Email is required.' : 'Email must be a string.')
    })
    .nonempty({ error: 'Email is required.' })
    .regex(EmailRegex, { message: 'Invalid email address format' }),
  password: z.string().nonempty({ error: 'Email is required.' }).min(8, { message: 'Password must be at least 8 characters.' }),
  rememberMe: z
    .boolean({
      error: (issue) => (issue.input === undefined ? 'Remember me is required.' : 'Remember me must be a boolean')
    })
    .default(true)
})

export const RegistrationSchema = z
  .object({
    name: z
      .string({
        error: (issue) => (issue.input === undefined ? 'First name is required.' : 'First name must be a string.')
      })
      .nonempty({ error: 'First name is required.' })
      .min(3, { error: 'First name is required.' }),
    email: z.string().nonempty({ error: 'Email is required.' }).regex(EmailRegex, { message: 'Invalid email address format' }),
    password: z
      .string({
        error: (issue) => (issue.input === undefined ? 'Password is required.' : 'Password must be a string.')
      })
      .nonempty({ error: 'Password is required.' })
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z
      .string({
        error: (issue) => (issue.input === undefined ? 'Password confirmation is required.' : 'Password confirmation must be a string.')
      })
      .nonempty({ error: 'Password confirmation is required.' })
      .min(8, {
        message: 'Password confirmation must be at least 8 characters.'
      }),
    agreeToTermsAndConditions: z
      .boolean({
        error: (issue) => (issue.input === undefined ? 'Agree to terms and conditions is required.' : 'Agree to terms and conditions must be a boolean')
      })
      .default(false)
  })
  .superRefine(async (data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['password']
      })
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword']
      })
    }
  })

export type TLoginData = z.infer<typeof LoginSchema>
export type TRegistrationData = z.infer<typeof RegistrationSchema> & { isRegistration?: boolean }
export type TRegistrationNextAuthData = TRegistrationData & { isRegistration?: boolean }
export type TAuthForm = TLoginData | TRegistrationData

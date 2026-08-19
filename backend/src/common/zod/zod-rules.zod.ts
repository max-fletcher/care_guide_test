import { z } from 'zod'

export const imageValidationRule = z.object({
  fieldname: z.string(),
  originalname: z.union([
    z.string().toLowerCase().endsWith('.jpg', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().endsWith('.jpeg', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().endsWith('.png', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().endsWith('.webp', {
      message: 'File type must be jpg, jpeg, png or webp'
    })
  ]),
  mimetype: z.union([
    z.string().toLowerCase().includes('image/jpg', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().includes('image/jpeg', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().includes('image/png', {
      message: 'File type must be jpg, jpeg, png or webp'
    }),
    z.string().toLowerCase().includes('image/webp', {
      message: 'File type must be jpg, jpeg, png or webp'
    })
  ]),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.number().max(5242880, { message: 'File size must be less than 5MB' })
})

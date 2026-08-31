import { z } from 'zod'

export const employeeSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Enter a valid email address'),
  mobile: z
    .string()
    .regex(/^[0-9+\s-]{8,15}$/, 'Enter a valid mobile number (8-15 digits)'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(2, 'State is required').max(50, 'State must be at most 50 characters'),
  district: z
    .string()
    .min(2, 'District is required')
    .max(50, 'District must be at most 50 characters'),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>

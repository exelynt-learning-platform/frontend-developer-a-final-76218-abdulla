import { describe, it, expect } from 'vitest'
import { employeeSchema } from './schema'

const valid = {
  name: 'Alice Wonderland',
  email: 'alice@example.com',
  mobile: '9876543210',
  country: 'India',
  state: 'Karnataka',
  district: 'Bangalore',
}

describe('employeeSchema validation', () => {
  it('accepts a valid employee', () => {
    expect(employeeSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects empty required fields', () => {
    const result = employeeSchema.safeParse({ ...valid, name: '', email: '', country: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = employeeSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects name shorter than 3 characters', () => {
    const result = employeeSchema.safeParse({ ...valid, name: 'Ab' })
    expect(result.success).toBe(false)
  })

  it('rejects name longer than 50 characters', () => {
    const result = employeeSchema.safeParse({ ...valid, name: 'A'.repeat(51) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid mobile format', () => {
    const result = employeeSchema.safeParse({ ...valid, mobile: '123' })
    expect(result.success).toBe(false)
  })

  it('rejects missing state and district', () => {
    const result = employeeSchema.safeParse({ ...valid, state: '', district: '' })
    expect(result.success).toBe(false)
  })
})

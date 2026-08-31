import type { Country, Employee, EmployeeInput } from '../types'

const BASE = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1'

export class ApiError extends Error {
  status: number
  constructor(status: number) {
    super(`Request failed with status ${status}`)
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new ApiError(res.status)
  }
  return res.json() as Promise<T>
}

export const employeeApi = {
  getAll: () => request<Employee[]>('/employee'),
  getById: (id: string) => request<Employee | null>(`/employee/${id}`),
  create: (data: EmployeeInput) =>
    request<Employee>('/employee', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: EmployeeInput) =>
    request<Employee>(`/employee/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<void>(`/employee/${id}`, { method: 'DELETE' }),
}

export const countryApi = {
  getAll: () => request<Country[]>('/country'),
}

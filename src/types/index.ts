export interface Country {
  id: string
  country: string
}

export interface Employee {
  id: string
  name: string
  email: string
  mobile: string
  country: string
  state: string
  district: string
  avatar?: string
}

export type EmployeeInput = Omit<Employee, 'id'>


import reducer, {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  fetchEmployeeById,
  updateEmployee,
} from './employeesSlice'

const employee = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  mobile: '1234567890',
  country: 'India',
  state: 'KA',
  district: 'Bangalore',
}

const input = {
  name: employee.name,
  email: employee.email,
  mobile: employee.mobile,
  country: employee.country,
  state: employee.state,
  district: employee.district,
}

describe('employeesSlice', () => {
  it('sets loading on fetch pending', () => {
    const state = reducer(undefined, fetchEmployees.pending('req', undefined))
    expect(state.loading).toBe(true)
  })

  it('populates employees on fetch fulfilled', () => {
    const state = reducer(undefined, fetchEmployees.fulfilled([employee], 'req', undefined))
    expect(state.employees).toEqual([employee])
    expect(state.loading).toBe(false)
  })

  it('sets error on fetch rejected', () => {
    const state = reducer(undefined, fetchEmployees.rejected(new Error('x'), 'req', undefined))
    expect(state.error).toBeTruthy()
    expect(state.loading).toBe(false)
  })

  it('stores search result on getById fulfilled', () => {
    const state = reducer(
      undefined,
      fetchEmployeeById.fulfilled(employee, 'req', '1'),
    )
    expect(state.search.result).toEqual(employee)
  })

  it('adds employee to list on create fulfilled', () => {
    const state = reducer(undefined, createEmployee.fulfilled(employee, 'req', input))
    expect(state.employees).toHaveLength(1)
    expect(state.employees[0].id).toBe('1')
  })

  it('updates employee on update fulfilled', () => {
    const initial = reducer(undefined, fetchEmployees.fulfilled([employee], 'req', undefined))
    const updated = reducer(
      initial,
      updateEmployee.fulfilled({ ...employee, name: 'Bob' }, 'req', { id: '1', data: input }),
    )
    expect(updated.employees[0].name).toBe('Bob')
  })

  it('removes employee on delete fulfilled', () => {
    const initial = reducer(undefined, fetchEmployees.fulfilled([employee], 'req', undefined))
    const after = reducer(initial, deleteEmployee.fulfilled(undefined, 'req', '1'))
    expect(after.employees).toHaveLength(0)
  })
})

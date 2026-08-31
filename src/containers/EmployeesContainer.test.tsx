import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '../features/employeesSlice'
import countriesReducer from '../features/countriesSlice'
import EmployeesContainer from './EmployeesContainer'
import { ApiError } from '../api/employeeApi'

const employee = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  mobile: '1111111111',
  country: 'India',
  state: 'KA',
  district: 'BLR',
}

const mockFetch = vi.fn()

function renderContainer() {
  const store = configureStore({
    reducer: { employees: employeesReducer, countries: countriesReducer },
  })
  return render(
    <Provider store={store}>
      <EmployeesContainer />
    </Provider>,
  )
}

describe('EmployeesContainer', () => {
  beforeEach(() => {
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('/country')) {
        return Promise.resolve({ ok: true, json: async () => [{ id: '1', country: 'India' }] })
      }
      return Promise.resolve({ ok: true, json: async () => [employee] })
    })
    globalThis.fetch = mockFetch as unknown as typeof fetch
  })

  afterEach(() => mockFetch.mockClear())

  it('renders employees from API after load', async () => {
    renderContainer()
    expect(screen.getByText(/Loading employees/i)).toBeInTheDocument()
    expect(await screen.findByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getAllByText('India').length).toBeGreaterThanOrEqual(1)
  })

  it('shows empty state when no employees', async () => {
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('/country')) {
        return Promise.resolve({ ok: true, json: async () => [] })
      }
      return Promise.resolve({ ok: true, json: async () => [] })
    })
    renderContainer()
    expect(await screen.findByText(/No employees yet/i)).toBeInTheDocument()
  })

  it('shows not-found message when searching invalid id', async () => {
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('/country')) {
        return Promise.resolve({ ok: true, json: async () => [] })
      }
      if (url.includes('/employee/999')) {
        return Promise.reject(new ApiError(404))
      }
      return Promise.resolve({ ok: true, json: async () => [employee] })
    })
    const user = userEvent.setup()
    renderContainer()
    await screen.findByText('Alice')
    await user.type(screen.getByLabelText(/Search by employee ID/i), '999')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(await screen.findByText(/No employee found/i)).toBeInTheDocument()
  })

  it('filters the table by name', async () => {
    const user = userEvent.setup()
    renderContainer()
    await screen.findByText('Alice')
    await user.type(screen.getByLabelText(/Filter employees/i), 'Bob')
    expect(await screen.findByText(/No matches/i)).toBeInTheDocument()
  })

  it('shows matching rows when filter matches', async () => {
    const user = userEvent.setup()
    renderContainer()
    await screen.findByText('Alice')
    await user.type(screen.getByLabelText(/Filter employees/i), 'alice')
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText(/No matches/i)).not.toBeInTheDocument()
  })
})

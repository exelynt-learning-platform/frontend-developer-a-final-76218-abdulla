
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployeeForm from './EmployeeForm'

const countries = [
  { id: '1', country: 'India' },
  { id: '2', country: 'USA' },
]

const validInput = () => {
  const name = screen.getByLabelText(/Name/i)
  const email = screen.getByLabelText(/Email/i)
  const mobile = screen.getByLabelText(/Mobile/i)
  const country = screen.getByLabelText(/Country/i)
  const state = screen.getByLabelText(/State/i)
  const district = screen.getByLabelText(/District/i)
  return { name, email, mobile, country, state, district }
}

describe('EmployeeForm', () => {
  it('renders title add mode and all fields', () => {
    render(<EmployeeForm countries={countries} countriesLoading={false} editing={null} onSubmit={jest.fn()} onCancel={jest.fn()} />)
    expect(screen.getByRole('heading', { name: 'Add Employee' })).toBeInTheDocument()
    expect(validInput()).toBeTruthy()
  })

  it('validates required fields and shows errors', async () => {
    const user = userEvent.setup()
    render(<EmployeeForm countries={countries} countriesLoading={false} editing={null} onSubmit={jest.fn()} onCancel={jest.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Add Employee' }))
    expect(await screen.findAllByText(/required|must be|valid/i)).not.toHaveLength(0)
  })

  it('shows email format error', async () => {
    const user = userEvent.setup()
    render(<EmployeeForm countries={countries} countriesLoading={false} editing={null} onSubmit={jest.fn()} onCancel={jest.fn()} />)
    const { email, name, mobile, country, state, district } = validInput()
    await user.type(name, 'Alice Wonderland')
    await user.type(email, 'bad-email')
    await user.type(mobile, '9876543210')
    await user.selectOptions(country, 'India')
    await user.type(state, 'Karnataka')
    await user.type(district, 'Bangalore')
    await user.click(screen.getByRole('button', { name: 'Add Employee' }))
    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument()
  })

  it('shows length error for short name', async () => {
    const user = userEvent.setup()
    render(<EmployeeForm countries={countries} countriesLoading={false} editing={null} onSubmit={jest.fn()} onCancel={jest.fn()} />)
    const { name, email, mobile, country, state, district } = validInput()
    await user.type(name, 'Ab')
    await user.type(email, 'alice@example.com')
    await user.type(mobile, '9876543210')
    await user.selectOptions(country, 'India')
    await user.type(state, 'Karnataka')
    await user.type(district, 'Bangalore')
    await user.click(screen.getByRole('button', { name: 'Add Employee' }))
    expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument()
  })

  it('submits valid data and pre-populates on edit', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    const editing = {
      id: '9',
      name: 'Bob',
      email: 'bob@example.com',
      mobile: '1234567890',
      country: 'USA',
      state: 'CA',
      district: 'LA',
    }
    render(<EmployeeForm countries={countries} countriesLoading={false} editing={editing} onSubmit={onSubmit} onCancel={jest.fn()} />)
    expect(screen.getByText('Edit Employee')).toBeInTheDocument()
    const { name, email, mobile, country, state, district } = validInput()
    expect(name).toHaveValue('Bob')
    expect(email).toHaveValue('bob@example.com')
    expect(mobile).toHaveValue('1234567890')
    expect(country).toHaveValue('USA')
    expect(state).toHaveValue('CA')
    expect(district).toHaveValue('LA')
    await user.click(screen.getByRole('button', { name: 'Update' }))
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Bob',
      email: 'bob@example.com',
      mobile: '1234567890',
      country: 'USA',
      state: 'CA',
      district: 'LA',
    })
  })
})

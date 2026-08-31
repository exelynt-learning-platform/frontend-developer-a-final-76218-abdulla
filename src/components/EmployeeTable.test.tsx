import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'
import EmployeeTable from './EmployeeTable'
import DeleteDialog from './DeleteDialog'

const staff = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    mobile: '1111111111',
    country: 'India',
    state: 'KA',
    district: 'BLR',
  },
]

describe('SearchBar', () => {
  it('triggers search with id', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} onClear={vi.fn()} />)
    await user.type(screen.getByLabelText(/Search by employee ID/i), '42')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(onSearch).toHaveBeenCalledWith('42')
  })

  it('clears via clear button', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<SearchBar onSearch={vi.fn()} onClear={onClear} />)
    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(onClear).toHaveBeenCalled()
  })
})

describe('EmployeeTable', () => {
  it('renders employee columns', () => {
    render(<EmployeeTable employees={staff} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('1111111111')).toBeInTheDocument()
    expect(screen.getByText('India')).toBeInTheDocument()
  })

  it('calls onEdit and onDelete', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<EmployeeTable employees={staff} onEdit={onEdit} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: 'Edit Alice' }))
    await user.click(screen.getByRole('button', { name: 'Delete Alice' }))
    expect(onEdit).toHaveBeenCalledWith(staff[0])
    expect(onDelete).toHaveBeenCalledWith(staff[0])
  })
})

describe('DeleteDialog', () => {
  it('shows employee name and confirms delete', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    render(<DeleteDialog employee={staff[0]} onConfirm={onConfirm} onCancel={onCancel} />)
    expect(screen.getByText(/Delete employee\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Alice/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onConfirm).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalled()
  })
})

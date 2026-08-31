import type { Employee } from '../types'

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Avatar({ employee }: { employee: Employee }) {
  if (employee.avatar) {
    return <img className="avatar" src={employee.avatar} alt="" loading="lazy" />
  }
  return (
    <span className="avatar avatar--fallback" aria-hidden="true">
      {initials(employee.name) || '?'}
    </span>
  )
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="table-wrap">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th className="table-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td data-label="Name">
                <div className="name-cell">
                  <Avatar employee={emp} />
                  <div className="name-cell__text">
                    <span className="name-cell__name">{emp.name}</span>
                    <span className="name-cell__id">ID {emp.id}</span>
                  </div>
                </div>
              </td>
              <td data-label="Email">{emp.email}</td>
              <td data-label="Mobile">{emp.mobile}</td>
              <td data-label="Country">
                <span className="country-badge">{emp.country}</span>
              </td>
              <td data-label="Actions" className="table-actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => onEdit(emp)}
                  aria-label={`Edit ${emp.name}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => onDelete(emp)}
                  aria-label={`Delete ${emp.name}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

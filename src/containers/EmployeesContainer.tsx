import { useEffect, useState } from 'react'
import {
  clearSearch,
  createEmployee,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployees,
  updateEmployee,
} from '../features/employeesSlice'
import { fetchCountries } from '../features/countriesSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import type { Employee, EmployeeInput } from '../types'
import SearchBar from '../components/SearchBar'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'
import DeleteDialog from '../components/DeleteDialog'
import Loader from '../components/Loader'
import Message from '../components/Message'

export default function EmployeesContainer() {
  const dispatch = useAppDispatch()
  const { employees, loading, error, search, saving, savingError } = useAppSelector(
    (s) => s.employees,
  )
  const { countries, loading: countriesLoading } = useAppSelector((s) => s.countries)

  const [editing, setEditing] = useState<Employee | null>(null)
  const [deleting, setDeleting] = useState<Employee | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchCountries())
  }, [dispatch])

  const q = filter.trim().toLowerCase()
  const filteredEmployees = q
    ? employees.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.mobile.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q),
      )
    : employees

  const handleSearch = (id: string) => {
    dispatch(fetchEmployeeById(id))
  }

  const handleClearSearch = () => {
    dispatch(clearSearch())
  }

  const handleSubmit = (data: EmployeeInput) => {
    if (editing) {
      dispatch(updateEmployee({ id: editing.id, data }))
      setEditing(null)
    } else {
      dispatch(createEmployee(data))
    }
  }

  const handleDeleteConfirm = () => {
    if (deleting) {
      dispatch(deleteEmployee(deleting.id))
      setDeleting(null)
    }
  }

  const { loading: searchLoading, result: searchResult, error: searchError, notFound: searchNotFound, searched } = search

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Employee Management</h1>
        <p className="app-subtitle">Manage your team in one place.</p>
      </header>

      <section className="panel search-section" aria-label="Search employee">
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          disabled={saving}
        />
        {searchLoading && <Loader label="Searching..." />}
        {searchError && <Message type="error" title={searchError} />}
        {!searchLoading && !searchError && searchNotFound && searched && (
          <Message type="empty" title="No employee found">
            <p>No employee exists with that ID. Please check the ID and try again.</p>
          </Message>
        )}
        {!searchLoading && !searchError && !searchNotFound && !searched && (
          <div className="search-hint">
            Search by the employee ID shown in the last column, e.g. 551.
          </div>
        )}
        {searchResult && (
          <div className="search-result">
            <Message type="success" title="Employee found">
              <div className="search-result__row">
                <span>{searchResult.name}</span>
                <span>{searchResult.email}</span>
                <span>{searchResult.mobile}</span>
                <span>{searchResult.country}</span>
              </div>
            </Message>
          </div>
        )}
      </section>

      <section className="main-layout">
        <div className="panel list-section" aria-label="Employee list">
          <div className="list-toolbar">
            <h2 className="list-title">Your team</h2>
            <input
              type="search"
              className="list-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by name, email, mobile or country..."
              aria-label="Filter employees"
            />
          </div>

          {loading && <Loader label="Loading employees..." />}
          {error && <Message type="error" title={error} />}
          {!loading && !error && employees.length === 0 && (
            <Message type="empty" title="No employees yet">
              <p>Use the form to add your first employee.</p>
            </Message>
          )}
          {!loading && !error && employees.length > 0 && filteredEmployees.length === 0 && (
            <Message type="empty" title="No matches">
              <p>No employees match your filter. Try a different keyword.</p>
            </Message>
          )}
          {!loading && !error && filteredEmployees.length > 0 && (
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={setEditing}
              onDelete={setDeleting}
            />
          )}
        </div>

        <aside
          className={`panel form-section${editing ? ' form-section--edit' : ''}`}
          aria-label="Employee form"
        >
          <EmployeeForm
            key={editing?.id ?? 'new'}
            countries={countries}
            countriesLoading={countriesLoading}
            editing={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            busy={saving}
            error={savingError}
          />
        </aside>
      </section>

      {deleting && (
        <DeleteDialog
          employee={deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleting(null)}
          busy={saving}
        />
      )}
    </div>
  )
}

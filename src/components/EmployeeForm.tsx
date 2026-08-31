import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, type EmployeeFormValues } from '../validation/schema'
import type { Country, Employee, EmployeeInput } from '../types'

interface EmployeeFormProps {
  countries: Country[]
  countriesLoading: boolean
  editing: Employee | null
  onSubmit: (data: EmployeeInput) => void
  onCancel: () => void
  busy?: boolean
  error?: string | null
}

export default function EmployeeForm({
  countries,
  countriesLoading,
  editing,
  onSubmit,
  onCancel,
  busy,
  error,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: editing?.name ?? '',
      email: editing?.email ?? '',
      mobile: editing?.mobile ?? '',
      country: editing?.country ?? '',
      state: editing?.state ?? '',
      district: editing?.district ?? '',
    },
  })

  const submit = (values: EmployeeFormValues) => {
    onSubmit(values)
    if (!editing) reset()
  }

  const fieldError = (name: keyof EmployeeFormValues) =>
    errors[name] ? <span className="field__error">{errors[name]?.message}</span> : null

  const countryInList = countries.some((c) => c.country === editing?.country)
  const countryOptions = !editing || countryInList ? countries : [...countries, { id: 'editing', country: editing.country }]

  return (
    <form className="employee-form" onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="form-title">
        {editing ? 'Edit Employee' : 'Add Employee'}
        {editing && <span className="edit-tag">Editing</span>}
      </h2>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" {...register('name')} placeholder="Full name" />
          {fieldError('name')}
        </div>

        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" {...register('email')} placeholder="name@example.com" />
          {fieldError('email')}
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile *</label>
          <input id="mobile" {...register('mobile')} placeholder="+91 98765 43210" />
          {fieldError('mobile')}
        </div>

        <div className="field">
          <label htmlFor="country">Country *</label>
          <select id="country" {...register('country')} disabled={countriesLoading}>
            <option value="">{countriesLoading ? 'Loading countries...' : 'Select country'}</option>
            {countryOptions.map((c) => (
              <option key={c.id} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>
          {fieldError('country')}
        </div>

        <div className="field">
          <label htmlFor="state">State *</label>
          <input id="state" {...register('state')} placeholder="State" />
          {fieldError('state')}
        </div>

        <div className="field">
          <label htmlFor="district">District *</label>
          <input id="district" {...register('district')} placeholder="District" />
          {fieldError('district')}
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={busy}>
          {busy ? (editing ? 'Saving...' : 'Adding...') : editing ? 'Update' : 'Add Employee'}
        </button>
        {editing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

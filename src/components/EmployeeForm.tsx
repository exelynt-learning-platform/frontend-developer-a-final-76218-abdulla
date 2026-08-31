import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, type EmployeeFormValues } from '../validation/schema'
import type { Country, Employee, EmployeeInput } from '../types'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

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
    control,
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

  const countryInList = countries.some((c) => c.country === editing?.country)
  const countryOptions =
    !editing || countryInList
      ? countries
      : [...countries, { id: 'editing', country: editing.country }]

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
      <Typography variant="h6" gutterBottom fontWeight={700}>
        {editing ? 'Edit Employee' : 'Add Employee'}
        {editing && (
          <span
            style={{
              marginLeft: 8,
              fontSize: '0.75rem',
              padding: '2px 8px',
              background: '#e3f2fd',
              color: '#1976d2',
              borderRadius: 4,
            }}
          >
            Editing
          </span>
        )}
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} my={2}>
        <TextField
          label="Name"
          required
          fullWidth
          size="small"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          required
          type="email"
          fullWidth
          size="small"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Mobile"
          required
          fullWidth
          size="small"
          {...register('mobile')}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
        />

        <FormControl fullWidth size="small" error={!!errors.country}>
          <InputLabel id="country-label">Country *</InputLabel>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select labelId="country-label" label="Country *" {...field} disabled={countriesLoading}>
                <MenuItem value="">
                  <em>{countriesLoading ? 'Loading countries...' : 'Select country'}</em>
                </MenuItem>
                {countryOptions.map((c) => (
                  <MenuItem key={c.id} value={c.country}>
                    {c.country}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.country?.message}</FormHelperText>
        </FormControl>

        <TextField
          label="State"
          required
          fullWidth
          size="small"
          {...register('state')}
          error={!!errors.state}
          helperText={errors.state?.message}
        />

        <TextField
          label="District"
          required
          fullWidth
          size="small"
          {...register('district')}
          error={!!errors.district}
          helperText={errors.district?.message}
        />
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ my: 1 }} role="alert">
          {error}
        </Typography>
      )}

      <Box display="flex" gap={1.5} mt={2}>
        <Button type="submit" variant="contained" disabled={busy} fullWidth>
          {busy ? (editing ? 'Saving...' : 'Adding...') : editing ? 'Update' : 'Add Employee'}
        </Button>
        {editing && (
          <Button type="button" variant="outlined" onClick={onCancel} disabled={busy} fullWidth>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  )
}

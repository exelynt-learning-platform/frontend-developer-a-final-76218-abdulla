import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { employeeApi, ApiError } from '../api/employeeApi'
import type { Employee, EmployeeInput } from '../types'

export interface EmployeeState {
  employees: Employee[]
  loading: boolean
  error: string | null
  search: {
    loading: boolean
    result: Employee | null
    error: string | null
    notFound: boolean
    searched: boolean
  }
  saving: boolean
  savingError: string | null
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  search: { loading: false, result: null, error: null, notFound: false, searched: false },
  saving: false,
  savingError: null,
}

export const fetchEmployees = createAsyncThunk('employees/fetchAll', employeeApi.getAll)
export const fetchEmployeeById = createAsyncThunk<
  Employee | null,
  string,
  { rejectValue: number }
>('employees/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await employeeApi.getById(id)
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.status : 0)
  }
})
export const createEmployee = createAsyncThunk(
  'employees/create',
  (data: EmployeeInput) => employeeApi.create(data),
)
export const updateEmployee = createAsyncThunk(
  'employees/update',
  ({ id, data }: { id: string; data: EmployeeInput }) => employeeApi.update(id, data),
)
export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  (id: string) => employeeApi.delete(id),
)

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.search = { loading: false, result: null, error: null, notFound: false, searched: false }
    },
    clearSavingError: (state) => {
      state.savingError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to load employees.'
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.search.loading = true
        state.search.error = null
        state.search.result = null
        state.search.notFound = false
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.search.loading = false
        state.search.result = action.payload
        state.search.notFound = false
        state.search.searched = true
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.search.loading = false
        state.search.searched = true
        if (action.payload === 404) {
          state.search.notFound = true
          state.search.error = null
        } else {
          state.search.notFound = false
          state.search.error = 'Search failed. Please try again.'
        }
      })
      .addCase(createEmployee.pending, (state) => {
        state.saving = true
        state.savingError = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.saving = false
        state.employees.unshift(action.payload)
      })
      .addCase(createEmployee.rejected, (state) => {
        state.saving = false
        state.savingError = 'Could not create employee.'
      })
      .addCase(updateEmployee.pending, (state) => {
        state.saving = true
        state.savingError = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.saving = false
        const idx = state.employees.findIndex((e) => e.id === action.payload.id)
        if (idx !== -1) state.employees[idx] = action.payload
        if (state.search.result?.id === action.payload.id) state.search.result = action.payload
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.saving = false
        state.savingError = 'Could not update employee.'
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.saving = true
        state.savingError = null
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.saving = false
        state.employees = state.employees.filter((e) => e.id !== action.meta.arg)
        if (state.search.result?.id === action.meta.arg) {
          state.search.result = null
          state.search.error = null
        }
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.saving = false
        state.savingError = 'Could not delete employee.'
      })
  },
})

export const { clearSearch, clearSavingError } = employeesSlice.actions
export default employeesSlice.reducer

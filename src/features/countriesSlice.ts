import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { countryApi } from '../api/employeeApi'
import type { Country } from '../types'

export interface CountryState {
  countries: Country[]
  loading: boolean
  error: string | null
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
}

export const fetchCountries = createAsyncThunk('countries/fetchAll', countryApi.getAll)

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false
        state.countries = action.payload
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to load countries.'
      })
  },
})

export default countriesSlice.reducer

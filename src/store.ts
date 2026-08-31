import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './features/employeesSlice'
import countriesReducer from './features/countriesSlice'

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    countries: countriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

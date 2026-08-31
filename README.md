# Employee Management App — Frontend Developer Final Assignment

A responsive Employee Management Application built with **React + TypeScript + Redux Toolkit**, following the **Smart/Dumb component** architecture.

## Features

- View employees in a responsive table (Name, Email, Mobile, Country)
- Search employee by ID with a clear "not found" message
- Add, edit, and delete employees with a delete confirmation dialog
- Pre-populated form when editing
- Form with: Name, Email, Mobile, Country, State, District
- Validation: required fields, email format, and field-length checks (Zod + react-hook-form)
- Loading, error, and empty states
- Soft pastel, minimalist + vector-pixel theme, fully mobile responsive

## Tech Stack

- React 18 + TypeScript + Vite
- Redux Toolkit (slices + async thunks) for state management
- react-hook-form + Zod for form handling & validation
- Vitest + Testing Library for unit tests

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # production build (runs tsc + vite)
npm run preview    # preview the production build
npm run lint       # eslint
npm test           # run unit tests
```

## API

Uses the provided mock API at `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1`
(`/employee` and `/country` endpoints).

## Project structure

```
src/
  api/            # API service layer + tests
  components/     # Dumb/presentational components + tests
  containers/     # Smart components (state + business logic) + tests
  features/       # Redux slices (employees, countries) + tests
  validation/     # Zod schemas + tests
  types/          # Shared types
  store.ts        # Redux store
  hooks.ts        # Typed Redux hooks
```

The only smart component is `containers/EmployeesContainer.tsx`, which owns all
state and business logic and composes the dumb components (`EmployeeTable`,
`EmployeeForm`, `SearchBar`, `DeleteDialog`, `Loader`, `Message`).


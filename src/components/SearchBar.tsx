import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

interface SearchBarProps {
  onSearch: (id: string) => void
  onClear: () => void
  disabled?: boolean
}

export default function SearchBar({ onSearch, onClear, disabled }: SearchBarProps) {
  const [id, setId] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id.trim()) onSearch(id.trim())
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      display="flex"
      gap={1.5}
      flexWrap="wrap"
      role="search"
      alignItems="center"
    >
      <TextField
        size="small"
        label="Search by employee ID"
        variant="outlined"
        value={id}
        onChange={(e) => setId(e.target.value)}
        disabled={disabled}
        inputProps={{ 'aria-label': 'Search by employee ID' }}
      />
      <Button type="submit" variant="contained" disabled={disabled || !id.trim()} size="medium">
        Search
      </Button>
      <Button type="button" variant="outlined" onClick={onClear} disabled={disabled} size="medium">
        Clear
      </Button>
    </Box>
  )
}

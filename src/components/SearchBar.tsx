import { useState } from 'react'

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
    <form className="search-bar" onSubmit={submit} role="search">
      <input
        type="text"
        inputMode="numeric"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Search by employee ID"
        aria-label="Search by employee ID"
        disabled={disabled}
      />
      <button type="submit" className="btn btn--primary" disabled={disabled || !id.trim()}>
        Search
      </button>
      <button type="button" className="btn btn--ghost" onClick={onClear} disabled={disabled}>
        Clear
      </button>
    </form>
  )
}

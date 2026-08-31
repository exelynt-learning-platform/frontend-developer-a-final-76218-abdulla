import type { Employee } from '../types'

interface DeleteDialogProps {
  employee: Employee
  onConfirm: () => void
  onCancel: () => void
  busy?: boolean
}

export default function DeleteDialog({ employee, onConfirm, onCancel, busy }: DeleteDialogProps) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
      <div className="dialog">
        <h2 className="dialog__title">Delete employee?</h2>
        <p className="dialog__text">
          Are you sure you want to delete <strong>{employee.name}</strong>? This action cannot be
          undone.
        </p>
        <div className="dialog__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

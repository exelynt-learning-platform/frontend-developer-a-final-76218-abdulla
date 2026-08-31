import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { Employee } from '../types'

interface DeleteDialogProps {
  employee: Employee
  onConfirm: () => void
  onCancel: () => void
  busy?: boolean
}

export default function DeleteDialog({ employee, onConfirm, onCancel, busy }: DeleteDialogProps) {
  return (
    <Dialog open onClose={onCancel} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete employee?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{employee.name}</strong>? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={busy} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={busy} color="error" variant="contained">
          {busy ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

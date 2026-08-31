import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { Employee } from '../types'

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Mobile</strong>
            </TableCell>
            <TableCell>
              <strong>Country</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id} hover>
              <TableCell data-label="Name">
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar src={emp.avatar} alt={emp.name} sx={{ width: 36, height: 36 }}>
                    {!emp.avatar && initials(emp.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {emp.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {emp.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell data-label="Email">{emp.email}</TableCell>
              <TableCell data-label="Mobile">{emp.mobile}</TableCell>
              <TableCell data-label="Country">{emp.country}</TableCell>
              <TableCell data-label="Actions" align="right">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(emp)}
                  aria-label={`Edit ${emp.name}`}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(emp)}
                  aria-label={`Delete ${emp.name}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

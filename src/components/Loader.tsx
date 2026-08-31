import { Box, CircularProgress, Typography } from '@mui/material'

export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <Box display="flex" alignItems="center" gap={2} p={2} role="status">
      <CircularProgress size={24} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
}

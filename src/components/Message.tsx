import { Alert, AlertTitle, Box } from '@mui/material'

interface MessageProps {
  type: 'error' | 'empty' | 'success' | 'info'
  title: string
  children?: React.ReactNode
}

export default function Message({ type, title, children }: MessageProps) {
  const severity = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'
  return (
    <Box my={1} role={type === 'error' ? 'alert' : 'status'}>
      <Alert severity={severity} variant="outlined">
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Box>
  )
}

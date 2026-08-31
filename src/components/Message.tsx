interface MessageProps {
  type: 'error' | 'empty' | 'success' | 'info'
  title: string
  children?: React.ReactNode
}

export default function Message({ type, title, children }: MessageProps) {
  return (
    <div className={`message message--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <p className="message__title">{title}</p>
      {children && <div className="message__body">{children}</div>}
    </div>
  )
}

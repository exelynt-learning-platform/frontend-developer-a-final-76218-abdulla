export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="loader" role="status">
      <div className="loader__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

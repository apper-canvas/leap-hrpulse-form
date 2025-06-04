const StatusBadge = ({ status, className = "" }) => {
  let badgeClasses = ''
  let text = ''

  switch (status) {
    case 'approved':
      badgeClasses = 'bg-secondary/10 text-secondary'
      text = 'Approved'
      break
    case 'rejected':
      badgeClasses = 'bg-red-100 text-red-600'
      text = 'Rejected'
      break
    case 'pending':
    default:
      badgeClasses = 'bg-accent/10 text-accent'
      text = 'Pending'
      break
  }

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badgeClasses} ${className}`}>
      {text}
    </span>
  )
}

export default StatusBadge
const Text = ({ children, className = '', tag: Tag = 'p' }) => (
  <Tag className={className}>{children}</Tag>
)

export default Text
import { motion } from 'framer-motion'

const Card = ({ children, className = '', initial = { opacity: 0, y: 20 }, animate = { opacity: 1, y: 0 }, transition = {} }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200 hover:shadow-card transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card
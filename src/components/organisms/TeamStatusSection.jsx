import { motion } from 'framer-motion'
import EmployeeCard from '../molecules/EmployeeCard'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const TeamStatusSection = ({ employees }) => (
  <motion.div
    key="team"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.length > 0 ? (
        employees.slice(0, 6).map((employee, index) => (
          <EmployeeCard key={employee.employeeId || index} employee={employee} />
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-surface-600">
          <ApperIcon name="Users" className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <Text>No team members found</Text>
        </div>
      )}
    </div>

    {employees.length > 6 && (
      <div className="text-center">
        <Button variant="ghost" className="text-primary hover:text-primary-dark">
          View All Team Members ({employees.length})
        </Button>
      </div>
    )}
  </motion.div>
)

export default TeamStatusSection
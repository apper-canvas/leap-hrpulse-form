import employeeData from '../mockData/employee.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let employees = [...employeeData]

const employeeService = {
  async getAll() {
    await delay(300)
    return [...employees]
  },

  async getById(id) {
    await delay(200)
    const employee = employees.find(emp => emp.employeeId === id)
    return employee ? { ...employee } : null
  },

  async create(employeeData) {
    await delay(400)
    const newEmployee = {
      ...employeeData,
      employeeId: `EMP${String(Date.now()).slice(-3)}`,
      joiningDate: employeeData.joiningDate || new Date().toISOString().split('T')[0]
    }
    employees.push(newEmployee)
    return { ...newEmployee }
  },

  async update(id, employeeData) {
    await delay(350)
    const index = employees.findIndex(emp => emp.employeeId === id)
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employeeData }
      return { ...employees[index] }
    }
    throw new Error('Employee not found')
  },

  async delete(id) {
    await delay(300)
    const index = employees.findIndex(emp => emp.employeeId === id)
    if (index !== -1) {
      const deleted = employees.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Employee not found')
  }
}

export default employeeService
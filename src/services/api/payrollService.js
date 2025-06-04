import payrollData from '../mockData/payroll.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let payrolls = [...payrollData]

const payrollService = {
  async getAll() {
    await delay(350)
    return [...payrolls]
  },

  async getById(id) {
    await delay(200)
    const payroll = payrolls.find(pr => pr.id === id)
    return payroll ? { ...payroll } : null
  },

  async getByEmployeeId(employeeId) {
    await delay(300)
    return payrolls.filter(pr => pr.employeeId === employeeId).map(pr => ({ ...pr }))
  },

  async create(payrollData) {
    await delay(500)
    const newPayroll = {
      ...payrollData,
      id: Date.now(),
      month: payrollData.month || new Date().toISOString().slice(0, 7)
    }
    payrolls.push(newPayroll)
    return { ...newPayroll }
  },

  async update(id, payrollData) {
    await delay(400)
    const index = payrolls.findIndex(pr => pr.id === id)
    if (index !== -1) {
      payrolls[index] = { ...payrolls[index], ...payrollData }
      return { ...payrolls[index] }
    }
    throw new Error('Payroll record not found')
  },

  async delete(id) {
    await delay(300)
    const index = payrolls.findIndex(pr => pr.id === id)
    if (index !== -1) {
      const deleted = payrolls.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Payroll record not found')
  }
}

export default payrollService
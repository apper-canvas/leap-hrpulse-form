import leaveData from '../mockData/leave.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let leaves = [...leaveData]

const leaveService = {
  async getAll() {
    await delay(300)
    return [...leaves]
  },

  async getById(id) {
    await delay(200)
    const leave = leaves.find(lv => lv.id === id)
    return leave ? { ...leave } : null
  },

  async getByEmployeeId(employeeId) {
    await delay(300)
    return leaves.filter(lv => lv.employeeId === employeeId).map(lv => ({ ...lv }))
  },

  async create(leaveData) {
    await delay(500)
    const newLeave = {
      ...leaveData,
      id: Date.now(),
      appliedDate: leaveData.appliedDate || new Date().toISOString().split('T')[0],
      status: leaveData.status || 'pending'
    }
    leaves.push(newLeave)
    return { ...newLeave }
  },

  async update(id, leaveData) {
    await delay(400)
    const index = leaves.findIndex(lv => lv.id === id)
    if (index !== -1) {
      leaves[index] = { ...leaves[index], ...leaveData }
      return { ...leaves[index] }
    }
    throw new Error('Leave record not found')
  },

  async delete(id) {
    await delay(300)
    const index = leaves.findIndex(lv => lv.id === id)
    if (index !== -1) {
      const deleted = leaves.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Leave record not found')
  }
}

export default leaveService
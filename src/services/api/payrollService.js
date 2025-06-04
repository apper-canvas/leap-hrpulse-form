const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// All fields from payroll table for fetching
const allPayrollFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'month', 'salary', 'employee_id'
];

// Only updateable fields for create/update operations
const updateablePayrollFields = [
  'Name', 'Tags', 'Owner', 'month', 'salary', 'employee_id'
];

const payrollService = {
  async getAll(filters = {}) {
    try {
      const params = {
        fields: allPayrollFields,
        pagingInfo: {
          limit: filters.limit || 100,
          offset: filters.offset || 0
        }
      };

      if (filters.where) {
        params.where = filters.where;
      }

      const response = await apperClient.fetchRecords('payroll', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching payrolls:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allPayrollFields
      };

      const response = await apperClient.getRecordById('payroll', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching payroll with ID ${id}:`, error);
      return null;
    }
  },

  async getByEmployeeId(employeeId) {
    try {
      const params = {
        fields: allPayrollFields,
        where: [
          {
            fieldName: "employee_id",
            operator: "EqualTo",
            values: [employeeId]
          }
        ]
      };

      const response = await apperClient.fetchRecords('payroll', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching payroll for employee ${employeeId}:`, error);
      return [];
    }
  },

  async create(payrollData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateablePayrollFields.forEach(field => {
        if (payrollData[field] !== undefined) {
          filteredData[field] = payrollData[field];
        }
      });

      // Ensure month is in proper date format
      if (filteredData.month && typeof filteredData.month === 'string') {
        if (!filteredData.month.includes('-')) {
          filteredData.month = new Date().toISOString().slice(0, 7);
        }
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord('payroll', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create payroll');
        }
      } else {
        throw new Error('Failed to create payroll');
      }
    } catch (error) {
      console.error("Error creating payroll:", error);
      throw error;
    }
  },

  async update(id, payrollData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id };
      updateablePayrollFields.forEach(field => {
        if (payrollData[field] !== undefined) {
          filteredData[field] = payrollData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord('payroll', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update payroll');
        }
      } else {
        throw new Error('Failed to update payroll');
      }
    } catch (error) {
      console.error("Error updating payroll:", error);
      throw error;
    }
  },

  async delete(ids) {
    try {
      const recordIds = Array.isArray(ids) ? ids : [ids];
      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('payroll', params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete payroll(s)');
      }
    } catch (error) {
      console.error("Error deleting payroll:", error);
      throw error;
    }
  }
}

export default payrollService
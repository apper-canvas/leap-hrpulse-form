const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// All fields from employee table for fetching
const allEmployeeFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'employee_id', 'email', 'department', 'designation', 'joining_date'
];

// Only updateable fields for create/update operations
const updateableEmployeeFields = [
  'Name', 'Tags', 'Owner', 'employee_id', 'email', 'department', 'designation', 'joining_date'
];

const employeeService = {
  async getAll(filters = {}) {
    try {
      const params = {
        fields: allEmployeeFields,
        pagingInfo: {
          limit: filters.limit || 100,
          offset: filters.offset || 0
        }
      };

      if (filters.where) {
        params.where = filters.where;
      }

      const response = await apperClient.fetchRecords('employee', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allEmployeeFields
      };

      const response = await apperClient.getRecordById('employee', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      return null;
    }
  },

  async create(employeeData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableEmployeeFields.forEach(field => {
        if (employeeData[field] !== undefined) {
          filteredData[field] = employeeData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord('employee', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create employee');
        }
      } else {
        throw new Error('Failed to create employee');
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  async update(id, employeeData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id };
      updateableEmployeeFields.forEach(field => {
        if (employeeData[field] !== undefined) {
          filteredData[field] = employeeData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord('employee', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update employee');
        }
      } else {
        throw new Error('Failed to update employee');
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  async delete(ids) {
    try {
      const recordIds = Array.isArray(ids) ? ids : [ids];
      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('employee', params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete employee(s)');
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }
}

export default employeeService
const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// All fields from leave table for fetching
const allLeaveFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'leave_type', 'start_date', 'end_date', 'status', 'applied_date', 'employee_id'
];

// Only updateable fields for create/update operations
const updateableLeaveFields = [
  'Name', 'Tags', 'Owner', 'leave_type', 'start_date', 'end_date', 'status', 'applied_date', 'employee_id'
];

const leaveService = {
  async getAll(filters = {}) {
    try {
      const params = {
        fields: allLeaveFields,
        pagingInfo: {
          limit: filters.limit || 100,
          offset: filters.offset || 0
        }
      };

      if (filters.where) {
        params.where = filters.where;
      }

      const response = await apperClient.fetchRecords('leave', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching leaves:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allLeaveFields
      };

      const response = await apperClient.getRecordById('leave', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching leave with ID ${id}:`, error);
      return null;
    }
  },

  async getByEmployeeId(employeeId) {
    try {
      const params = {
        fields: allLeaveFields,
        where: [
          {
            fieldName: "employee_id",
            operator: "EqualTo",
            values: [employeeId]
          }
        ]
      };

      const response = await apperClient.fetchRecords('leave', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching leaves for employee ${employeeId}:`, error);
      return [];
    }
  },

  async create(leaveData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableLeaveFields.forEach(field => {
        if (leaveData[field] !== undefined) {
          filteredData[field] = leaveData[field];
        }
      });

      // Ensure dates are in proper format
      if (filteredData.start_date && typeof filteredData.start_date === 'string') {
        filteredData.start_date = filteredData.start_date.split('T')[0];
      }
      if (filteredData.end_date && typeof filteredData.end_date === 'string') {
        filteredData.end_date = filteredData.end_date.split('T')[0];
      }
      if (filteredData.applied_date && typeof filteredData.applied_date === 'string') {
        filteredData.applied_date = filteredData.applied_date.split('T')[0];
      }

      // Set default status if not provided
      if (!filteredData.status) {
        filteredData.status = 'pending';
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord('leave', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create leave');
        }
      } else {
        throw new Error('Failed to create leave');
      }
    } catch (error) {
      console.error("Error creating leave:", error);
      throw error;
    }
  },

  async update(id, leaveData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id };
      updateableLeaveFields.forEach(field => {
        if (leaveData[field] !== undefined) {
          filteredData[field] = leaveData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord('leave', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update leave');
        }
      } else {
        throw new Error('Failed to update leave');
      }
    } catch (error) {
      console.error("Error updating leave:", error);
      throw error;
    }
  },

  async delete(ids) {
    try {
      const recordIds = Array.isArray(ids) ? ids : [ids];
      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('leave', params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete leave(s)');
      }
    } catch (error) {
      console.error("Error deleting leave:", error);
      throw error;
    }
  }
}

export default leaveService
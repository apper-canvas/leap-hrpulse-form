const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// All fields from attendance table for fetching
const allAttendanceFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'date', 'check_in', 'check_out', 'work_hours', 'employee_id'
];

// Only updateable fields for create/update operations
const updateableAttendanceFields = [
  'Name', 'Tags', 'Owner', 'date', 'check_in', 'check_out', 'work_hours', 'employee_id'
];

const attendanceService = {
  async getAll(filters = {}) {
    try {
      const params = {
        fields: allAttendanceFields,
        pagingInfo: {
          limit: filters.limit || 100,
          offset: filters.offset || 0
        }
      };

      if (filters.where) {
        params.where = filters.where;
      }

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allAttendanceFields
      };

      const response = await apperClient.getRecordById('attendance', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance with ID ${id}:`, error);
      return null;
    }
  },

  async getByEmployeeId(employeeId) {
    try {
      const params = {
        fields: allAttendanceFields,
        where: [
          {
            fieldName: "employee_id",
            operator: "EqualTo",
            values: [employeeId]
          }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance for employee ${employeeId}:`, error);
      return [];
    }
  },

  async create(attendanceData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableAttendanceFields.forEach(field => {
        if (attendanceData[field] !== undefined) {
          filteredData[field] = attendanceData[field];
        }
      });

      // Ensure date is in proper format
      if (filteredData.date && typeof filteredData.date === 'string') {
        filteredData.date = filteredData.date.split('T')[0];
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord('attendance', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create attendance');
        }
      } else {
        throw new Error('Failed to create attendance');
      }
    } catch (error) {
      console.error("Error creating attendance:", error);
      throw error;
    }
  },

  async update(id, attendanceData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id };
      updateableAttendanceFields.forEach(field => {
        if (attendanceData[field] !== undefined) {
          filteredData[field] = attendanceData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord('attendance', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update attendance');
        }
      } else {
        throw new Error('Failed to update attendance');
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      throw error;
    }
  },

  async delete(ids) {
    try {
      const recordIds = Array.isArray(ids) ? ids : [ids];
      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('attendance', params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete attendance(s)');
      }
    } catch (error) {
      console.error("Error deleting attendance:", error);
      throw error;
    }
  }
}

export default attendanceService
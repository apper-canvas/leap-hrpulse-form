const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// All fields from request table for fetching
const allRequestFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'type', 'subject', 'description', 'priority', 'status', 'submitted_date', 'response_date', 'response'
];

// Only updateable fields for create/update operations
const updateableRequestFields = [
  'Name', 'Tags', 'Owner', 'type', 'subject', 'description', 'priority', 'status', 'submitted_date', 'response_date', 'response'
];

const requestService = {
  async getAll(filters = {}) {
    try {
      const params = {
        fields: allRequestFields,
        pagingInfo: {
          limit: filters.limit || 100,
          offset: filters.offset || 0
        }
      };

      if (filters.where) {
        params.where = filters.where;
      }

      const response = await apperClient.fetchRecords('request', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching requests:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allRequestFields
      };

      const response = await apperClient.getRecordById('request', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching request with ID ${id}:`, error);
      return null;
    }
  },

  async create(requestData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableRequestFields.forEach(field => {
        if (requestData[field] !== undefined) {
          filteredData[field] = requestData[field];
        }
      });

      // Ensure dates are in proper format
      if (filteredData.submitted_date && typeof filteredData.submitted_date === 'string') {
        filteredData.submitted_date = filteredData.submitted_date.split('T')[0];
      }
      if (filteredData.response_date && typeof filteredData.response_date === 'string') {
        filteredData.response_date = filteredData.response_date.split('T')[0];
      }

      // Set default status if not provided
      if (!filteredData.status) {
        filteredData.status = 'pending';
      }

      // Set submitted date if not provided
      if (!filteredData.submitted_date) {
        filteredData.submitted_date = new Date().toISOString().split('T')[0];
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord('request', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create request');
        }
      } else {
        throw new Error('Failed to create request');
      }
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  async update(id, requestData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id };
      updateableRequestFields.forEach(field => {
        if (requestData[field] !== undefined) {
          filteredData[field] = requestData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord('request', params);
      
      if (response && response.success && response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update request');
        }
      } else {
        throw new Error('Failed to update request');
      }
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  },

  async delete(ids) {
    try {
      const recordIds = Array.isArray(ids) ? ids : [ids];
      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('request', params);
      
      if (response && response.success) {
        return true;
      } else {
        throw new Error('Failed to delete request(s)');
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      throw error;
    }
  }
}

export default requestService
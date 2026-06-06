// Automatically switch between local development and production deployment endpoints
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5001/api'
  :'https://ledgerstream-backend.onrender.com/api';
//   : `${window.location.protocol}//${window.location.hostname.replace('client', 'server').replace('manager', 'api')}/api`;


export const expenseApi = {
  // Fetch filtered expenses
  async getExpenses(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const response = await fetch(`${API_BASE_URL}/expenses?${params.toString()}`);
    if (!response.ok) throw new Error('Network error fetching expenses');
    return response.json();
  },

  // Fetch summary aggregation metrics
  async getSummary() {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) throw new Error('Network error fetching analytics summary');
    return response.json();
  },

  // Create an expense
  async createExpense(expenseData) {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create expense');
    return data;
  },

  // Update an existing expense
  async updateExpense(id, expenseData) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update expense');
    return data;
  },

  // Delete an expense
  async deleteExpense(id) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete expense');
    return response.json();
  }
};
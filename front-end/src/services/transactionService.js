import api from './api';

export const transactionService = {
  async getAll() {
    const response = await api.get('/transactions');
    return response.data;
  },

  async create(transactionData) {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  async update(id, transactionData) {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
};
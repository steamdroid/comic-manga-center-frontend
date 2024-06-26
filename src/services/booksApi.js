import axios from 'axios';

const booksApi = axios.create({
  baseURL: '/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  async getBooks(qs = '') {
    const res = await booksApi.get('books?' + qs);
    return res.data;
  },

  async getStatuses() {
    const res = await booksApi.get('bookStatuses');
    return res.data;
  },

  async getCategories() {
    const res = await booksApi.get('bookCategories');
    return res.data;
  }
};

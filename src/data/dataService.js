import axios from 'axios';

// En producción, Vercel gestiona la URL. En local usaremos la misma para serverless.
const API_URL = ''; 

export const dataService = {
  initialize: async () => {
    // We can call /api/seed once if needed, but the server handles seeding on startup/request if DB is empty usually.
    // For now, let's just use it to check connection.
  },

  getAll: async (key) => {
    const res = await axios.get(`${API_URL}/api/${key.toLowerCase()}`);
    return res.data;
  },

  getById: async (key, id) => {
    const res = await axios.get(`${API_URL}/api/${key.toLowerCase()}/${id}`);
    return res.data;
  },

  addEntity: async (key, entity) => {
    const res = await axios.post(`${API_URL}/api/${key.toLowerCase()}`, entity);
    return res.data;
  },

  updateEntity: async (key, id, updates) => {
    const res = await axios.patch(`${API_URL}/api/${key.toLowerCase()}/${id}`, updates);
    return res.data;
  },

  getDashboardKPIs: async () => {
    const res = await axios.get(`${API_URL}/api/dashboard`);
    return res.data;
  },

  getClassesWithDetails: async () => {
    const res = await axios.get(`${API_URL}/api/classes`);
    // The server already does .populate('studentId').populate('teacherId')
    // We map it back to the frontend structure if needed
    return res.data.map(c => ({
      ...c,
      student: c.studentId,
      teacher: c.teacherId
    }));
  }
};

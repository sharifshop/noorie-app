// API client service for Vidyalaya / Nooria Academy
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('vidyalaya_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  login: async (userId, password, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password, role })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('vidyalaya_token', data.token);
        localStorage.setItem('vidyalaya_user', JSON.stringify(data.user));
        localStorage.setItem('vidyalaya_profile', JSON.stringify(data.profile));
      }
      return data;
    } catch (e) {
      console.warn('API offline, falling back to local demo state');
      return { success: true, isMock: true };
    }
  },

  getMe: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('vidyalaya_token');
    localStorage.removeItem('vidyalaya_user');
    localStorage.removeItem('vidyalaya_profile');
  },

  // Attendance
  getAttendance: async (month = 'Apr 2026') => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance?month=${encodeURIComponent(month)}`, {
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  markAttendance: async (records, classSection = 'Class X-A') => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/mark`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ records, classSection })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Homework
  getHomework: async (subject = 'All') => {
    try {
      const url = subject && subject !== 'All' 
        ? `${API_BASE_URL}/homework?subject=${encodeURIComponent(subject)}` 
        : `${API_BASE_URL}/homework`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  createHomework: async (payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/homework`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  toggleHomeworkStatus: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/homework/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Notices
  getNotices: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  broadcastNotice: async (payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Timetable & Academic
  getTimetable: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/academic/timetable`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getExamMarks: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/marks`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getFeeReport: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/fees/report`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getAdminStats: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getStudents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/directory/students`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getTeachers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/directory/teachers`, { headers: getAuthHeaders() });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};

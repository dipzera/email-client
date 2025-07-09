const API_BASE_URL = 'http://localhost:3002';

export const emailAPI = {
  async getAllEmails() {
    const response = await fetch(`${API_BASE_URL}/emails`);
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }
    return response.json();
  },

  async searchEmails(searchTerm) {
    const response = await fetch(`${API_BASE_URL}/emails?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to search emails');
    }
    return response.json();
  },

  async getEmailById(id) {
    const response = await fetch(`${API_BASE_URL}/emails/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email');
    }
    return response.json();
  },

  async createEmail(emailData) {
    const response = await fetch(`${API_BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    if (!response.ok) {
      throw new Error('Failed to create email');
    }
    return response.json();
  }
};

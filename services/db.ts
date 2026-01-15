export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const DB_KEY = 'araf_contact_db';
const API_URL = 'http://localhost:3000/api/contact';

export const db = {
  async addSubmission(data: { name: string; email: string; message: string }) {
    console.log(`🔌 Attempting to connect to backend at ${API_URL}...`);
    
    try {
      // Attempt to send data to the MySQL backend
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Successfully saved to MySQL database:', result);
      return result;

    } catch (error) {
      console.warn('⚠️ Backend API unreachable. Switching to LocalStorage fallback mode.');
      console.warn('Error details:', error);
      return this.saveToLocalStorage(data);
    }
  },

  // Local Storage Fallback Implementation
  async saveToLocalStorage(data: { name: string; email: string; message: string }) {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const submissions: ContactSubmission[] = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
      
      const newSubmission: ContactSubmission = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
      };

      submissions.push(newSubmission);
      localStorage.setItem(DB_KEY, JSON.stringify(submissions));
      
      console.log('💾 Saved to local browser storage (Demo Mode):', newSubmission);
      return newSubmission;
    } catch (error) {
      console.error('Local Database Error:', error);
      throw new Error('Failed to save to database');
    }
  },

  getSubmissions(): ContactSubmission[] {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  },

  clearDatabase() {
    localStorage.removeItem(DB_KEY);
  }
};
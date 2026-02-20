
import { ClientSubmission, SubmissionStatus } from '../types';

const STORAGE_KEY = 'client_reach_submissions';

// Fallback in-memory storage if localStorage is blocked
let memoryStorage: Record<string, string> = {};

/**
 * Safely attempts to get the localStorage object.
 * In some sandboxed or private browsing environments, merely accessing 
 * the window.localStorage property can throw a SecurityError.
 */
const getLocalStorage = (): Storage | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    console.warn('localStorage access is restricted in this environment:', e);
  }
  return null;
};

const storage = getLocalStorage();

export const safeStorage = {
  getItem(key: string): string | null {
    if (!storage) return memoryStorage[key] || null;
    try {
      return storage.getItem(key);
    } catch (e) {
      return memoryStorage[key] || null;
    }
  },
  setItem(key: string, value: string): void {
    if (!storage) {
      memoryStorage[key] = value;
      return;
    }
    try {
      storage.setItem(key, value);
    } catch (e) {
      memoryStorage[key] = value;
    }
  },
  removeItem(key: string): void {
    if (!storage) {
      delete memoryStorage[key];
      return;
    }
    try {
      storage.removeItem(key);
    } catch (e) {
      delete memoryStorage[key];
    }
  }
};

export const db = {
  async getSubmissions(): Promise<ClientSubmission[]> {
    const data = safeStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async getSubmissionById(id: string): Promise<ClientSubmission | null> {
    const subs = await this.getSubmissions();
    return subs.find(s => s.id === id) || null;
  },

  async createSubmission(data: Partial<ClientSubmission>): Promise<ClientSubmission> {
    const subs = await this.getSubmissions();
    const newSub: ClientSubmission = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'pending_review',
      uploaded_files: data.uploaded_files || [],
    } as ClientSubmission;
    
    subs.push(newSub);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    return newSub;
  },

  async updateStatus(id: string, status: SubmissionStatus): Promise<void> {
    const subs = await this.getSubmissions();
    const index = subs.findIndex(s => s.id === id);
    if (index !== -1) {
      subs[index].status = status;
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    }
  },

  async deleteSubmission(id: string): Promise<void> {
    const subs = await this.getSubmissions();
    const filtered = subs.filter(s => s.id !== id);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};

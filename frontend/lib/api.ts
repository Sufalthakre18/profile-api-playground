import { AuthResponse, Profile, Project, SearchResults, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Something went wrong';

    try {
      const data = await response.json();
      message = data.error || data.message || message;
    } catch {
      if (response.status === 401) {
        message = 'Invalid email or password';
      } else if (response.status === 404) {
        message = 'Resource not found';
      } else if (response.status >= 500) {
        message = 'Server error. Please try again later.';
      } else {
        message = response.statusText;
      }
    }

    throw new Error(message);
  }

  return response.json();
}


// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },

  getMe: async (): Promise<User> => {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse<User>(response);
  },
};

// Profile API
export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const response = await fetch(`${API_URL}/api/profile`, {
      headers: getHeaders(),
    });
    return handleResponse<Profile>(response);
  },

  getProjects: async (skill?: string): Promise<Project[]> => {
    const url = skill 
      ? `${API_URL}/api/projects?skill=${encodeURIComponent(skill)}` 
      : `${API_URL}/api/projects`;
    
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return handleResponse<Project[]>(response);
  },

  getTopSkills: async (): Promise<string[]> => {
    const response = await fetch(`${API_URL}/api/skills/top`, {
      headers: getHeaders(),
    });
    return handleResponse<string[]>(response);
  },

  search: async (query: string): Promise<SearchResults> => {
    const response = await fetch(
      `${API_URL}/api/search?q=${encodeURIComponent(query)}`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse<SearchResults>(response);
  },

  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Profile>(response);
  },

  createProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Profile>(response);
  },
};

export const checkHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  return handleResponse(response);
};
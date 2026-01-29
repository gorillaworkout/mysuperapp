// Standardized HTTP client wrapper for ESMX

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  cache?: boolean;
  retries?: number;
}

export interface FetchResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
  ok: boolean;
}

// Mock API endpoint untuk demo
const MOCK_API_BASE = 'https://jsonplaceholder.typicode.com';

export class HttpClient {
  private baseURL: string;
  private defaultTimeout: number;
  private defaultRetries: number;

  constructor(baseURL: string = MOCK_API_BASE, timeout: number = 10000, retries: number = 3) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
    this.defaultRetries = retries;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<FetchResponse<T>> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, {
        ...config,
        signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined
      });

      const data = await response.json().catch(() => null);
      
      return {
        data: data as T,
        error: null,
        status: response.status,
        ok: response.ok
      };
    } catch (error) {
      return {
        data: null,
        error: error as Error,
        status: 0,
        ok: false
      };
    }
  }

  async get<T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }
}

// Singleton instance
export const apiClient = new HttpClient();

// Demo API endpoints
export const demoAPI = {
  // Todos
  async getTodos() {
    return apiClient.get<Todo[]>('/todos?_limit=10');
  },
  
  async createTodo(todo: Partial<Todo>) {
    return apiClient.post<Todo>('/todos', todo);
  },
  
  async updateTodo(id: number, todo: Partial<Todo>) {
    return apiClient.put<Todo>(`/todos/${id}`, todo);
  },
  
  async deleteTodo(id: number) {
    return apiClient.delete<{}>(`/todos/${id}`);
  },

  // Users
  async getUsers() {
    return apiClient.get<User[]>('/users?_limit=5');
  },
  
  async getUser(id: number) {
    return apiClient.get<User>(`/users/${id}`);
  },
  
  async createUser(user: Partial<User>) {
    return apiClient.post<User>('/users', user);
  }
};

// Type imports
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export type { FetchResponse, FetchOptions };

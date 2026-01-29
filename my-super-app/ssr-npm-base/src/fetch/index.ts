// Fecth utilities for SSR
export interface FetchOptions {
  cache?: boolean;
  timeout?: number;
}

export class HttpClient {
  async get<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(url, {
      signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined
    });
    return response.json();
  }

  async post<T>(url: string, data: any, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined
    });
    return response.json();
  }
}

export const fetchClient = new HttpClient();
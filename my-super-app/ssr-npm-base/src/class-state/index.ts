// Class-based state management
export abstract class BaseState {
  private listeners: Array<() => void> = [];

  protected notify() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Concrete implementations
export * from './SuperState';

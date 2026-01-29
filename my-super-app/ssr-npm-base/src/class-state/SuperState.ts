import { BaseState } from '../index.js';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export class SuperState extends BaseState {
  private _todos: Todo[] = [];
  private _users: User[] = [];
  private _currentUser: User | null = null;

  // Todos
  get todos() {
    return this._todos;
  }

  set todos(value: Todo[]) {
    this._todos = value;
    this.notify();
  }

  addTodo(text: string) {
    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    this._todos = [...this._todos, todo];
    this.notify();
  }

  toggleTodo(id: number) {
    this._todos = this._todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.notify();
  }

  removeTodo(id: number) {
    this._todos = this._todos.filter(todo => todo.id !== id);
    this.notify();
  }

  // Users
  get users() {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
    this.notify();
  }

  addUser(user: User) {
    this._users = [...this._users, user];
    this.notify();
  }

  // Current User
  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: User | null) {
    this._currentUser = user;
    this.notify();
  }

  login(email: string, name: string) {
    const user = this._users.find(u => u.email === email);
    if (user) {
      this.currentUser = user;
    } else {
      const newUser: User = {
        id: Date.now(),
        name,
        email
      };
      this.addUser(newUser);
      this.currentUser = newUser;
    }
  }

  logout() {
    this.currentUser = null;
  }
}

// Singleton instance
export const superState = new SuperState();

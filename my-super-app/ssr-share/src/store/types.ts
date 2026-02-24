export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: 'admin' | 'user';
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: number;
}

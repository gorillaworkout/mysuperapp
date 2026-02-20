export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    stock: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

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

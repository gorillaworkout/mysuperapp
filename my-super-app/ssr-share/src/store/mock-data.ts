import type { Product, User } from './types';

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        image: 'https://picsum.photos/200/200?random=1',
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation.',
        stock: 25
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://picsum.photos/200/200?random=2',
        category: 'Electronics',
        description: 'Feature-rich smartwatch with health monitoring.',
        stock: 15
    },
    {
        id: 3,
        name: 'Running Shoes',
        price: 129.99,
        image: 'https://picsum.photos/200/200?random=3',
        category: 'Sports',
        description: 'Lightweight running shoes for everyday training.',
        stock: 40
    },
    {
        id: 4,
        name: 'Backpack Pro',
        price: 89.99,
        image: 'https://picsum.photos/200/200?random=4',
        category: 'Accessories',
        description: 'Water-resistant backpack with laptop compartment.',
        stock: 30
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        price: 149.99,
        image: 'https://picsum.photos/200/200?random=5',
        category: 'Electronics',
        description: 'RGB mechanical keyboard with Cherry MX switches.',
        stock: 20
    },
    {
        id: 6,
        name: 'Yoga Mat',
        price: 39.99,
        image: 'https://picsum.photos/200/200?random=6',
        category: 'Sports',
        description: 'Non-slip yoga mat with carrying strap.',
        stock: 50
    }
];

export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Bayu Darmawan',
        email: 'bayu@example.com',
        avatar: 'https://picsum.photos/100/100?random=10',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar: 'https://picsum.photos/100/100?random=11',
        role: 'user'
    },
    {
        id: 3,
        name: 'Takeshi Yamamoto',
        email: 'takeshi@example.com',
        avatar: 'https://picsum.photos/100/100?random=12',
        role: 'user'
    }
];

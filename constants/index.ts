export const offers = [
    {
        id: 1,
        name: "Cabbage",
        image_url: "https://images.unsplash.com/vector-1739805925414-cf3baa384c5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",
        price: 200,
    },
    {
        id: 2,
        name: "Carrot",
                image_url: "https://images.unsplash.com/vector-1753250564954-1b6d301a4a1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",

        price: 100,
    },
    {
        id: 3,
        name: "Tomato",
                image_url: "https://plus.unsplash.com/premium_vector-1731665822835-02d7367c1997?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",

        price: 50,
    },
    {
        id: 4,
        name: "Onion",
                image_url: "https://plus.unsplash.com/premium_vector-1749481306110-f7a17e2c8f95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",

        price: 70,
    },
];

import type { Category, Farmer } from "@/type";

export const categories: Category[] = [
    { name: "Cabbage", description: "Leafy green vegetable" },
    { name: "Carrot", description: "Crunchy orange root" },
    { name: "Tomato", description: "Juicy red fruit often used as a vegetable" },
    { name: "Onion", description: "Pungent bulb used for flavor" },
    { name: "Potato", description: "Starchy tuber used in many dishes" },
]

export const farmers: Farmer[] = [
    {
        id: "1",
        name: "John Kamau",
        location: "Kiambu, Kikuyu",
        distance: "2.5 km away",
        avatar: "https://i.pravatar.cc/150?img=12",
        isVerified: true,
        postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        availableQuantity: 150,
        unit: "kg",
        rating: 4.8,
        totalDeliveries: 234
    },
    {
        id: "2",
        name: "Mary Wanjiru",
        location: "Limuru, Tigoni",
        distance: "5.2 km away",
        avatar: "https://i.pravatar.cc/150?img=47",
        isVerified: true,
        postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        availableQuantity: 80,
        unit: "kg",
        rating: 4.9,
        totalDeliveries: 456
    },
    {
        id: "3",
        name: "Peter Ochieng",
        location: "Nairobi, Rongai",
        distance: "8.7 km away",
        avatar: "https://i.pravatar.cc/150?img=33",
        isVerified: false,
        postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        availableQuantity: 200,
        unit: "kg",
        rating: 4.5,
        totalDeliveries: 89
    },
    {
        id: "4",
        name: "Grace Akinyi",
        location: "Kiambu, Ruiru",
        distance: "3.8 km away",
        avatar: "https://i.pravatar.cc/150?img=25",
        isVerified: true,
        postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        availableQuantity: 120,
        unit: "kg",
        rating: 4.7,
        totalDeliveries: 312
    },
    {
        id: "5",
        name: "David Mwangi",
        location: "Nairobi, Karen",
        distance: "12.3 km away",
        avatar: "https://i.pravatar.cc/150?img=51",
        isVerified: true,
        postedDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        availableQuantity: 95,
        unit: "kg",
        rating: 4.6,
        totalDeliveries: 178
    }
]

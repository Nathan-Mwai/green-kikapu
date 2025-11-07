import { create } from 'zustand';
import { CartItem, CartGroup, Farmer } from '@/type';

interface CartState {
    items: CartItem[];
    
    addItem: (product: {
        name: string;
        image: string;
        price: number;
        unit: string;
    }, quantity: number, farmer: Farmer) => void;
    
    removeItem: (itemId: string) => void;
    
    updateQuantity: (itemId: string, quantity: number) => void;
    
    clearCart: () => void;
    
    getCartGroups: () => CartGroup[];
    
    getCartTotal: () => number;
    
    getItemCount: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
    items: [],
    
    addItem: (product, quantity, farmer) => {
        const newItem: CartItem = {
            id: `${Date.now()}-${Math.random()}`,
            productName: product.name,
            productImage: product.image,
            quantity,
            unit: product.unit,
            pricePerUnit: product.price,
            farmer
        };
        
        set((state) => ({
            items: [...state.items, newItem]
        }));
    },
    
    removeItem: (itemId) => {
        set((state) => ({
            items: state.items.filter(item => item.id !== itemId)
        }));
    },
    
    updateQuantity: (itemId, quantity) => {
        set((state) => ({
            items: state.items.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        }));
    },
    
    clearCart: () => {
        set({ items: [] });
    },
    
    getCartGroups: () => {
        const { items } = get();
        const groups: { [key: string]: CartGroup } = {};
        
        items.forEach(item => {
            const farmerId = item.farmer.id;
            
            if (!groups[farmerId]) {
                groups[farmerId] = {
                    farmerId,
                    farmerName: item.farmer.name,
                    farmerLocation: item.farmer.location,
                    farmerAvatar: item.farmer.avatar,
                    isVerified: item.farmer.isVerified,
                    items: []
                };
            }
            
            groups[farmerId].items.push(item);
        });
        
        return Object.values(groups);
    },
    
    getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.pricePerUnit * item.quantity), 0);
    },
    
    getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
    }
}));

export default useCartStore;

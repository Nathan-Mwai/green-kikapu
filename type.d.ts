import {Models} from 'react-native-appwrite'

export interface MenuItem extends Models.Row{
    name: string;
    price: number;
    image_url: string;
    // description: string;
    // calories: number;
    // protein: number;
    // rating: number;
    // type: string;
}

export interface Category extends Models.Row{
    name: string;
    description: string;
}

export interface Farmer {
    id: string;
    name: string;
    location: string;
    distance: string; // e.g., "2.5 km away"
    avatar: string;
    isVerified: boolean;
    postedDate: string; // ISO date string
    availableQuantity: number;
    unit: string; // e.g., "kg", "pieces"
    rating: number;
    totalDeliveries: number;
}

export interface User extends Models.Row {
    name: string;
    email: string;
    avatar: string;
}
export interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

export interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

export interface CartItem {
    id: string;
    productName: string;
    productImage: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    farmer: Farmer;
}

export interface CartGroup {
    farmerId: string;
    farmerName: string;
    farmerLocation: string;
    farmerAvatar: string;
    isVerified: boolean;
    items: CartItem[];
}

export type DeliveryMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'mpesa' | 'card';

export interface OrderSummary {
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    total: number;
}

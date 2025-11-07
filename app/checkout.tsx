import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import useCartStore from '@/store/cart.store'
import { DeliveryMethod, PaymentMethod, OrderSummary } from '@/type'
import cn from 'clsx'

const Checkout = () => {
    const { getCartTotal, clearCart } = useCartStore()
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa')
    
    const subtotal = getCartTotal()
    
    // Calculate fees with dynamic percentages
    const orderSummary: OrderSummary = useMemo(() => {
        const deliveryFee = deliveryMethod === 'delivery' ? 150 : 0
        
        // Service fee: 8% of subtotal (reasonable commission for the platform)
        const serviceFeePercentage = 0.08
        const serviceFee = subtotal * serviceFeePercentage
        
        const total = subtotal + deliveryFee + serviceFee
        
        return {
            subtotal,
            deliveryFee,
            serviceFee,
            total
        }
    }, [subtotal, deliveryMethod])
    
    const handlePlaceOrder = () => {
        if (!paymentMethod) {
            Alert.alert('Payment Method', 'Please select a payment method')
            return
        }
        
        // TODO: Implement actual payment processing
        Alert.alert(
            'Order Placed Successfully!',
            `Your order will be ${deliveryMethod === 'delivery' ? 'delivered to your location' : 'ready for pickup'}.\n\nPayment via ${paymentMethod === 'mpesa' ? 'M-Pesa' : 'Card'} will be processed.`,
            [
                {
                    text: 'Track Order',
                    onPress: () => {
                        clearCart()
                        router.push('/order-tracking')
                    }
                }
            ]
        )
    }
    
    return (
        <SafeAreaView className='bg-white h-full'>
            {/* Header */}
            <View className='flex-row items-center px-5 py-4 border-b border-gray-200/30'>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className='w-10 h-10 rounded-full bg-gray-200/30 flex-center mr-3'
                >
                    <Ionicons name="arrow-back" size={24} color="#181C2E" />
                </TouchableOpacity>
                <Text className='base-bold text-dark-100'>Checkout</Text>
            </View>
            
            <ScrollView className='flex-1' contentContainerClassName='pb-6'>
                {/* Delivery Method Section */}
                <View className='px-5 py-6'>
                    <Text className='paragraph-bold text-dark-100 mb-4'>Delivery Method</Text>
                    
                    <TouchableOpacity
                        onPress={() => setDeliveryMethod('delivery')}
                        className={cn(
                            'rounded-2xl p-4 mb-3 border-2 flex-row items-center gap-3',
                            deliveryMethod === 'delivery' ? 'border-primary bg-primary/5' : 'border-gray-200/30'
                        )}
                    >
                        <View className={cn(
                            'w-12 h-12 rounded-full flex-center',
                            deliveryMethod === 'delivery' ? 'bg-primary' : 'bg-gray-200/30'
                        )}>
                            <Ionicons 
                                name="bicycle" 
                                size={24} 
                                color={deliveryMethod === 'delivery' ? '#fff' : '#878787'} 
                            />
                        </View>
                        
                        <View className='flex-1'>
                            <Text className='paragraph-bold text-dark-100'>Home Delivery</Text>
                            <Text className='body-regular text-gray-100'>Get it delivered to your doorstep</Text>
                            <Text className='body-medium text-primary mt-1'>+ Ksh 150.00</Text>
                        </View>
                        
                        {deliveryMethod === 'delivery' && (
                            <Ionicons name="checkmark-circle" size={24} color="#598216" />
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => setDeliveryMethod('pickup')}
                        className={cn(
                            'rounded-2xl p-4 border-2 flex-row items-center gap-3',
                            deliveryMethod === 'pickup' ? 'border-primary bg-primary/5' : 'border-gray-200/30'
                        )}
                    >
                        <View className={cn(
                            'w-12 h-12 rounded-full flex-center',
                            deliveryMethod === 'pickup' ? 'bg-primary' : 'bg-gray-200/30'
                        )}>
                            <Ionicons 
                                name="storefront" 
                                size={24} 
                                color={deliveryMethod === 'pickup' ? '#fff' : '#878787'} 
                            />
                        </View>
                        
                        <View className='flex-1'>
                            <Text className='paragraph-bold text-dark-100'>Pickup</Text>
                            <Text className='body-regular text-gray-100'>Collect from farmer&apos;s location</Text>
                            <Text className='body-medium text-success mt-1'>Free</Text>
                        </View>
                        
                        {deliveryMethod === 'pickup' && (
                            <Ionicons name="checkmark-circle" size={24} color="#598216" />
                        )}
                    </TouchableOpacity>
                    
                    {/* Map Placeholder */}
                    <View className='mt-4 p-4 bg-gray-200/30 rounded-2xl border border-gray-200/50'>
                        <View className='flex-row items-center gap-2 mb-2'>
                            <Ionicons name="location" size={20} color="#598216" />
                            <Text className='paragraph-semibold text-dark-100'>
                                {deliveryMethod === 'delivery' ? 'Delivery Location' : 'Pickup Location'}
                            </Text>
                        </View>
                        <Text className='body-regular text-gray-100 mb-3'>
                            {deliveryMethod === 'delivery' 
                                ? 'Your delivery address will be confirmed on the next step' 
                                : 'Farmer location will be shared after order confirmation'}
                        </Text>
                        <View className='bg-gray-100 h-40 rounded-xl flex-center'>
                            <Ionicons name="map-outline" size={48} color="#878787" />
                            <Text className='body-regular text-gray-100 mt-2'>Map view (Coming soon)</Text>
                        </View>
                    </View>
                </View>
                
                {/* Payment Method Section */}
                <View className='px-5 py-6 border-t border-gray-200/30'>
                    <Text className='paragraph-bold text-dark-100 mb-4'>Payment Method</Text>
                    
                    <TouchableOpacity
                        onPress={() => setPaymentMethod('mpesa')}
                        className={cn(
                            'rounded-2xl p-4 mb-3 border-2 flex-row items-center gap-3',
                            paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'border-gray-200/30'
                        )}
                    >
                        <View className={cn(
                            'w-12 h-12 rounded-full flex-center',
                            paymentMethod === 'mpesa' ? 'bg-primary' : 'bg-gray-200/30'
                        )}>
                            <Ionicons 
                                name="phone-portrait" 
                                size={24} 
                                color={paymentMethod === 'mpesa' ? '#fff' : '#878787'} 
                            />
                        </View>
                        
                        <View className='flex-1'>
                            <Text className='paragraph-bold text-dark-100'>M-Pesa</Text>
                            <Text className='body-regular text-gray-100'>Pay with your mobile money</Text>
                        </View>
                        
                        {paymentMethod === 'mpesa' && (
                            <Ionicons name="checkmark-circle" size={24} color="#598216" />
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => setPaymentMethod('card')}
                        className={cn(
                            'rounded-2xl p-4 border-2 flex-row items-center gap-3',
                            paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200/30'
                        )}
                    >
                        <View className={cn(
                            'w-12 h-12 rounded-full flex-center',
                            paymentMethod === 'card' ? 'bg-primary' : 'bg-gray-200/30'
                        )}>
                            <Ionicons 
                                name="card" 
                                size={24} 
                                color={paymentMethod === 'card' ? '#fff' : '#878787'} 
                            />
                        </View>
                        
                        <View className='flex-1'>
                            <Text className='paragraph-bold text-dark-100'>Card Payment</Text>
                            <Text className='body-regular text-gray-100'>Pay with debit or credit card</Text>
                        </View>
                        
                        {paymentMethod === 'card' && (
                            <Ionicons name="checkmark-circle" size={24} color="#598216" />
                        )}
                    </TouchableOpacity>
                </View>
                
                {/* Order Summary Section */}
                <View className='px-5 py-6 border-t border-gray-200/30'>
                    <Text className='paragraph-bold text-dark-100 mb-4'>Order Summary</Text>
                    
                    <View className='bg-gray-200/20 rounded-2xl p-4'>
                        <View className='flex-row items-center justify-between mb-3'>
                            <Text className='body-regular text-gray-100'>Subtotal</Text>
                            <Text className='paragraph-semibold text-dark-100'>Ksh {orderSummary.subtotal.toFixed(2)}</Text>
                        </View>
                        
                        <View className='flex-row items-center justify-between mb-3'>
                            <Text className='body-regular text-gray-100'>Delivery Fee</Text>
                            <Text className='paragraph-semibold text-dark-100'>
                                {orderSummary.deliveryFee === 0 ? 'Free' : `Ksh ${orderSummary.deliveryFee.toFixed(2)}`}
                            </Text>
                        </View>
                        
                        <View className='flex-row items-center justify-between mb-3'>
                            <View className='flex-row items-center gap-1'>
                                <Text className='body-regular text-gray-100'>Service Fee</Text>
                                <Text className='text-xs text-gray-100'>(8%)</Text>
                            </View>
                            <Text className='paragraph-semibold text-dark-100'>Ksh {orderSummary.serviceFee.toFixed(2)}</Text>
                        </View>
                        
                        <View className='h-[1px] bg-gray-200 my-3' />
                        
                        <View className='flex-row items-center justify-between'>
                            <Text className='paragraph-bold text-dark-100'>Total</Text>
                            <Text className='base-bold text-primary'>Ksh {orderSummary.total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
            {/* Place Order Button */}
            <View 
                className='px-5 py-4 bg-white border-t border-gray-200/30'
                style={Platform.OS === 'android' ? { elevation: 10 } : {}}
            >
                <TouchableOpacity
                    className='custom-btn'
                    onPress={handlePlaceOrder}
                >
                    <Text className='paragraph-semibold text-white'>
                        Place Order - Ksh {orderSummary.total.toFixed(2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Checkout

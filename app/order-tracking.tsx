import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const OrderTracking = () => {
    // Dummy order data
    const orderSteps = [
        { id: 1, title: 'Order Placed', description: 'Your order has been confirmed', completed: true, icon: 'checkmark-circle' },
        { id: 2, title: 'Farmer Preparing', description: 'Farmer is preparing your items', completed: true, icon: 'leaf' },
        { id: 3, title: 'Out for Delivery', description: 'Your order is on the way', completed: false, icon: 'bicycle' },
        { id: 4, title: 'Delivered', description: 'Order delivered successfully', completed: false, icon: 'home' }
    ]
    
    return (
        <SafeAreaView className='bg-white h-full'>
            {/* Header */}
            <View className='flex-row items-center px-5 py-4 border-b border-gray-200/30'>
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/')}
                    className='w-10 h-10 rounded-full bg-gray-200/30 flex-center mr-3'
                >
                    <Ionicons name="close" size={24} color="#181C2E" />
                </TouchableOpacity>
                <Text className='base-bold text-dark-100'>Track Order</Text>
            </View>
            
            <ScrollView className='flex-1' contentContainerClassName='pb-6'>
                {/* Success Message */}
                <View className='px-5 py-8 items-center'>
                    <View className='w-20 h-20 bg-success/10 rounded-full flex-center mb-4'>
                        <Ionicons name="checkmark-circle" size={48} color="#2F9B65" />
                    </View>
                    <Text className='base-bold text-dark-100 mb-2'>Order Confirmed!</Text>
                    <Text className='body-regular text-gray-100 text-center'>
                        Order #GK{Date.now().toString().slice(-6)}
                    </Text>
                    <Text className='body-regular text-gray-100 text-center mt-1'>
                        Estimated delivery: 30-45 minutes
                    </Text>
                </View>
                
                {/* Map Placeholder */}
                <View className='mx-5 mb-6'>
                    <View className='bg-gray-200/30 rounded-2xl border border-gray-200/50 overflow-hidden'>
                        <View className='bg-gray-100 h-64 flex-center'>
                            <Ionicons name="map" size={64} color="#878787" />
                            <Text className='paragraph-semibold text-dark-100 mt-4'>Live Tracking Map</Text>
                            <Text className='body-regular text-gray-100 mt-2 text-center px-8'>
                                Real-time delivery tracking will be available here
                            </Text>
                            <View className='mt-4 px-4 py-2 bg-primary/10 rounded-full'>
                                <Text className='body-medium text-primary'>Coming Soon</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                {/* Order Status Steps */}
                <View className='px-5'>
                    <Text className='paragraph-bold text-dark-100 mb-4'>Order Status</Text>
                    
                    {orderSteps.map((step, index) => (
                        <View key={step.id} className='flex-row mb-6'>
                            {/* Timeline Indicator */}
                            <View className='items-center mr-4'>
                                <View className={`w-12 h-12 rounded-full flex-center ${
                                    step.completed ? 'bg-primary' : 'bg-gray-200/30'
                                }`}>
                                    <Ionicons 
                                        name={step.icon as any} 
                                        size={24} 
                                        color={step.completed ? '#fff' : '#878787'} 
                                    />
                                </View>
                                {index < orderSteps.length - 1 && (
                                    <View className={`w-0.5 h-12 ${
                                        step.completed ? 'bg-primary' : 'bg-gray-200'
                                    }`} />
                                )}
                            </View>
                            
                            {/* Step Info */}
                            <View className='flex-1 pt-2'>
                                <Text className='paragraph-bold text-dark-100'>{step.title}</Text>
                                <Text className='body-regular text-gray-100 mt-1'>{step.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                
                {/* Delivery Info Placeholder */}
                <View className='mx-5 mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/20'>
                    <View className='flex-row items-center gap-3 mb-3'>
                        <View className='w-12 h-12 bg-primary rounded-full flex-center'>
                            <Ionicons name="person" size={24} color="#fff" />
                        </View>
                        <View className='flex-1'>
                            <Text className='paragraph-semibold text-dark-100'>Delivery Partner</Text>
                            <Text className='body-regular text-gray-100'>Details will be shared when ready</Text>
                        </View>
                    </View>
                    
                    <View className='flex-row gap-3 mt-3'>
                        <TouchableOpacity className='flex-1 bg-white border border-primary rounded-full py-3 flex-center'>
                            <Ionicons name="call" size={20} color="#598216" />
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-1 bg-white border border-primary rounded-full py-3 flex-center'>
                            <Ionicons name="chatbubble" size={20} color="#598216" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            
            {/* Bottom Actions */}
            <View 
                className='px-5 py-4 bg-white border-t border-gray-200/30'
                style={Platform.OS === 'android' ? { elevation: 10 } : {}}
            >
                <TouchableOpacity
                    className='custom-btn'
                    onPress={() => router.push('/(tabs)/')}
                >
                    <Text className='paragraph-semibold text-white'>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OrderTracking

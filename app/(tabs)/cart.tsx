import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import useCartStore from '@/store/cart.store'
import { router } from 'expo-router'

export default function Cart() {
    const { getCartGroups, getCartTotal, removeItem, updateQuantity, getItemCount } = useCartStore()
    
    const cartGroups = getCartGroups()
    const cartTotal = getCartTotal()
    const itemCount = getItemCount()
    
    if (cartGroups.length === 0) {
        return (
            <SafeAreaView className='bg-white h-full'>
                <View className='px-5 py-4 border-b border-gray-200/30'>
                    <Text className='base-bold text-dark-100'>My Cart</Text>
                </View>
                
                <View className='flex-1 flex-center px-5'>
                    <Ionicons name="cart-outline" size={80} color="#878787" />
                    <Text className='paragraph-bold text-dark-100 mt-4'>Your cart is empty</Text>
                    <Text className='body-regular text-gray-100 mt-2 text-center'>
                        Add some fresh produce from local farmers
                    </Text>
                    <TouchableOpacity 
                        className='custom-btn mt-6'
                        onPress={() => router.push('/(tabs)/')}
                    >
                        <Text className='paragraph-semibold text-white'>Browse Products</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    
    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='px-5 py-4 border-b border-gray-200/30'>
                <Text className='base-bold text-dark-100'>My Cart</Text>
                <Text className='body-regular text-gray-100 mt-1'>{itemCount} items from {cartGroups.length} farmers</Text>
            </View>
            
            <ScrollView className='flex-1' contentContainerClassName='pb-56'>
                {cartGroups.map((group) => (
                    <View key={group.farmerId} className='mt-4 px-5'>
                        {/* Farmer Header */}
                        <View className='flex-row items-center gap-3 mb-3'>
                            <Image
                                source={{ uri: group.farmerAvatar }}
                                className='w-12 h-12 rounded-full'
                            />
                            <View className='flex-1'>
                                <View className='flex-row items-center gap-2'>
                                    <Text className='paragraph-bold text-dark-100'>{group.farmerName}</Text>
                                    {group.isVerified && (
                                        <Ionicons name="checkmark-circle" size={16} color="#598216" />
                                    )}
                                </View>
                                <Text className='body-regular text-gray-100'>{group.farmerLocation}</Text>
                            </View>
                        </View>
                        
                        {/* Cart Items */}
                        {group.items.map((item) => (
                            <View
                                key={item.id}
                                className='bg-white rounded-2xl p-4 mb-3 border border-gray-200/30'
                                style={Platform.OS === 'android' ? { elevation: 1 } : {}}
                            >
                                <View className='flex-row gap-3'>
                                    <Image
                                        source={{ uri: item.productImage }}
                                        className='w-20 h-20 rounded-xl'
                                        resizeMode='contain'
                                    />
                                    
                                    <View className='flex-1'>
                                        <Text className='paragraph-bold text-dark-100 mb-1'>{item.productName}</Text>
                                        <Text className='body-regular text-primary mb-2'>Ksh {item.pricePerUnit} per {item.unit}</Text>
                                        
                                        {/* Quantity Controls */}
                                        <View className='flex-row items-center gap-3'>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (item.quantity > 1) {
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                }}
                                                className='w-8 h-8 bg-gray-200/30 rounded-full flex-center'
                                            >
                                                <Ionicons name="remove" size={16} color="#181C2E" />
                                            </TouchableOpacity>
                                            
                                            <Text className='paragraph-semibold text-dark-100 min-w-[30px] text-center'>
                                                {item.quantity}
                                            </Text>
                                            
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                                className='w-8 h-8 bg-primary rounded-full flex-center'
                                            >
                                                <Ionicons name="add" size={16} color="white" />
                                            </TouchableOpacity>
                                            
                                            <Text className='body-regular text-gray-100 ml-2'>{item.unit}</Text>
                                        </View>
                                    </View>
                                    
                                    {/* Price and Remove */}
                                    <View className='items-end justify-between'>
                                        <Text className='paragraph-bold text-dark-100'>
                                            Ksh {(item.pricePerUnit * item.quantity).toFixed(2)}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => removeItem(item.id)}
                                            className='w-8 h-8 bg-error/10 rounded-full flex-center'
                                        >
                                            <Ionicons name="trash-outline" size={16} color="#F14141" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                        
                        <View className='h-[1px] bg-gray-200/50 mt-2 mb-4' />
                    </View>
                ))}
            </ScrollView>
            
            {/* Bottom Summary */}
            <View 
                className='absolute left-0 right-0 bg-white px-5 py-4 border-t border-gray-200/30'
                style={[
                    { bottom: 120 }, // Position above tab bar (tab bar height 80px + bottom margin 40px)
                    Platform.OS === 'android' ? { elevation: 10 } : { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 }
                ]}
            >
                <View className='flex-row items-center justify-between mb-4'>
                    <Text className='paragraph-semibold text-gray-100'>Subtotal</Text>
                    <Text className='base-bold text-dark-100'>Ksh {cartTotal.toFixed(2)}</Text>
                </View>
                
                <TouchableOpacity
                    className='custom-btn'
                    onPress={() => router.push('/checkout')}
                >
                    <Text className='paragraph-semibold text-white'>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

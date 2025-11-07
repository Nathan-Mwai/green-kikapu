import { View, Text, Image, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { farmers } from '@/constants'
import FarmerCard from '@/components/FarmerCard'
import cn from 'clsx'
import useCartStore from '@/store/cart.store'

const MenuDetails = () => {
    const params = useLocalSearchParams()
    const { name, price, image_url } = params
    
    const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string>('1')
    
    const { addItem } = useCartStore()
    const selectedFarmer = farmers.find(f => f.id === selectedFarmerId)
    
    const handleAddToCart = () => {
        if (!selectedFarmerId) {
            Alert.alert('Select a Farmer', 'Please select a farmer before adding to cart')
            return
        }
        
        const qty = parseInt(quantity)
        if (isNaN(qty) || qty <= 0) {
            Alert.alert('Invalid Quantity', 'Please enter a valid quantity')
            return
        }
        
        if (selectedFarmer && qty > selectedFarmer.availableQuantity) {
            Alert.alert('Quantity Unavailable', `Only ${selectedFarmer.availableQuantity} ${selectedFarmer.unit} available from this farmer`)
            return
        }
        
        // Add to cart
        addItem(
            {
                name: name as string,
                image: image_url as string,
                price: Number(price),
                unit: selectedFarmer!.unit
            },
            qty,
            selectedFarmer!
        )
        
        Alert.alert(
            'Added to Cart',
            `${qty} ${selectedFarmer?.unit} of ${name} from ${selectedFarmer?.name} added to cart`,
            [
                { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
                { text: 'Continue Shopping', style: 'cancel' }
            ]
        )
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView className='flex-1'>
                {/* Header with Back Button */}
                <View className='flex-row items-center justify-between px-5 py-4'>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className='w-10 h-10 rounded-full bg-white shadow-md shadow-black/10 flex-center'
                        style={Platform.OS === 'android' ? { elevation: 5 } : {}}
                    >
                        <Ionicons name="arrow-back" size={24} color="#181C2E" />
                    </TouchableOpacity>
                    
                    <Text className='base-bold text-dark-100'>Menu Details</Text>
                    
                    {/* Placeholder for potential favorite/share button */}
                    <View className='w-10' />
                </View>

                {/* Image */}
                <View className='w-full items-center py-8'>
                    <Image
                        source={{ uri: image_url as string }}
                        className='w-64 h-64'
                        resizeMode='contain'
                    />
                </View>

                {/* Details Section */}
                <View className='px-5 py-6'>
                    <Text className='base-bold text-dark-100 mb-2'>{name}</Text>
                    
                    {price && (
                        <View className='flex-row items-center gap-2 mb-4'>
                            <Text className='paragraph-bold text-primary'>Ksh {price}</Text>
                        </View>
                    )}

                    {/* Description */}
                    <View className='mb-6'>
                        <Text className='paragraph-bold text-dark-100 mb-2'>Description</Text>
                        <Text className='paragraph-regular text-gray-100'>
                            Fresh and high-quality {name} sourced directly from local farms. 
                            Perfect for your daily meals and nutritious cooking.
                        </Text>
                    </View>

                    {/* Farmers Section */}
                    <View className='mb-6'>
                        <View className='flex-row items-center justify-between mb-3'>
                            <Text className='paragraph-bold text-dark-100'>Select Farmer</Text>
                            <Text className='body-regular text-gray-100'>{farmers.length} farmers available</Text>
                        </View>
                        
                        {farmers.map((farmer) => (
                            <FarmerCard
                                key={farmer.id}
                                farmer={farmer}
                                isSelected={selectedFarmerId === farmer.id}
                                onSelect={setSelectedFarmerId}
                            />
                        ))}
                    </View>

                    {/* Quantity Selector */}
                    {selectedFarmerId && (
                        <View className='mb-6'>
                            <Text className='paragraph-bold text-dark-100 mb-3'>Quantity</Text>
                            <View className='flex-row items-center gap-3'>
                                <TouchableOpacity
                                    onPress={() => {
                                        const qty = parseInt(quantity) || 0
                                        if (qty > 1) setQuantity(String(qty - 1))
                                    }}
                                    className='w-12 h-12 bg-gray-200/30 rounded-full flex-center'
                                >
                                    <Ionicons name="remove" size={24} color="#181C2E" />
                                </TouchableOpacity>

                                <TextInput
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    keyboardType='numeric'
                                    className='flex-1 text-center input border-gray-200'
                                    style={{ height: 48 }}
                                />

                                <TouchableOpacity
                                    onPress={() => {
                                        const qty = parseInt(quantity) || 0
                                        if (selectedFarmer && qty < selectedFarmer.availableQuantity) {
                                            setQuantity(String(qty + 1))
                                        }
                                    }}
                                    className='w-12 h-12 bg-primary rounded-full flex-center'
                                >
                                    <Ionicons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            
                            {selectedFarmer && (
                                <Text className='body-regular text-gray-100 mt-2 text-center'>
                                    Max: {selectedFarmer.availableQuantity} {selectedFarmer.unit} available
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Add to Cart Button */}
                    <TouchableOpacity 
                        className={cn(
                            'custom-btn mt-4',
                            !selectedFarmerId && 'opacity-50'
                        )}
                        onPress={handleAddToCart}
                        disabled={!selectedFarmerId}
                    >
                        <Text className='paragraph-semibold text-white'>
                            {selectedFarmerId ? 'Add to Cart' : 'Select a Farmer First'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MenuDetails

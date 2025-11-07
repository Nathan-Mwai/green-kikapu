import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { Farmer } from '@/type'
import { Ionicons } from '@expo/vector-icons'
import cn from 'clsx'

interface FarmerCardProps {
    farmer: Farmer
    isSelected: boolean
    onSelect: (farmerId: string) => void
}

const FarmerCard = ({ farmer, isSelected, onSelect }: FarmerCardProps) => {
    // Helper function to format time ago
    const getTimeAgo = (dateString: string) => {
        const now = new Date()
        const posted = new Date(dateString)
        const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))
        
        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays}d ago`
    }

    return (
        <TouchableOpacity
            onPress={() => onSelect(farmer.id)}
            className={cn(
                'bg-white rounded-2xl p-4 mb-3 border-2',
                isSelected ? 'border-primary' : 'border-gray-200/30'
            )}
            style={Platform.OS === 'android' ? { elevation: 2 } : { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }}
        >
            <View className='flex-row items-start gap-3'>
                {/* Farmer Avatar */}
                <View className='relative'>
                    <Image
                        source={{ uri: farmer.avatar }}
                        className='w-16 h-16 rounded-full'
                    />
                    {farmer.isVerified && (
                        <View className='absolute -bottom-1 -right-1 bg-primary rounded-full p-1'>
                            <Ionicons name="checkmark-circle" size={16} color="white" />
                        </View>
                    )}
                </View>

                {/* Farmer Info */}
                <View className='flex-1'>
                    <View className='flex-row items-center justify-between mb-1'>
                        <View className='flex-row items-center gap-2'>
                            <Text className='paragraph-bold text-dark-100'>{farmer.name}</Text>
                            {farmer.isVerified && (
                                <View className='bg-primary/10 px-2 py-0.5 rounded-full'>
                                    <Text className='text-xs text-primary font-rubik-semibold'>Verified</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Location and Distance */}
                    <View className='flex-row items-center gap-1 mb-2'>
                        <Ionicons name="location-outline" size={14} color="#878787" />
                        <Text className='body-regular text-gray-100'>{farmer.location}</Text>
                        <Text className='body-regular text-gray-100'>• {farmer.distance}</Text>
                    </View>

                    {/* Stats Row */}
                    <View className='flex-row items-center gap-4 mb-2'>
                        {/* Rating */}
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name="star" size={14} color="#FFB800" />
                            <Text className='body-medium text-dark-100'>{farmer.rating}</Text>
                        </View>

                        {/* Deliveries */}
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name="checkmark-circle-outline" size={14} color="#2F9B65" />
                            <Text className='body-regular text-gray-100'>{farmer.totalDeliveries} deliveries</Text>
                        </View>
                    </View>

                    {/* Availability Info */}
                    <View className='flex-row items-center justify-between mt-2 pt-2 border-t border-gray-200/30'>
                        <View className='flex-row items-center gap-2'>
                            <View className='bg-success/10 px-3 py-1 rounded-full'>
                                <Text className='body-medium text-success'>
                                    {farmer.availableQuantity} {farmer.unit} available
                                </Text>
                            </View>
                            <Text className='body-regular text-gray-100'>• {getTimeAgo(farmer.postedDate)}</Text>
                        </View>
                    </View>
                </View>

                {/* Selection Indicator */}
                {isSelected && (
                    <View className='bg-primary rounded-full p-1'>
                        <Ionicons name="checkmark" size={20} color="white" />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default FarmerCard

import {View, Text, ScrollView, TouchableOpacity, Image, Platform} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import useAuthStore from '@/store/auth.store'

const Profile = () => {
    const { logout } = useAuthStore()

    const menuItems = [
        { icon: 'person-outline', title: 'Edit Profile', route: null },
        { icon: 'location-outline', title: 'Delivery Addresses', route: null },
        { icon: 'card-outline', title: 'Payment Methods', route: null },
        { icon: 'time-outline', title: 'Order History', route: null },
        { icon: 'heart-outline', title: 'Favorites', route: null },
        { icon: 'settings-outline', title: 'Settings', route: null },
        { icon: 'help-circle-outline', title: 'Help & Support', route: null },
    ]

    const handleLogout = () => {
        logout()
        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView className='flex-1'>
                {/* Header */}
                <View className='px-5 py-6'>
                    <Text className='text-2xl font-rubik-bold text-dark-100'>Profile</Text>
                </View>

                {/* User Info Card */}
                <View className='mx-5 mb-6 p-5 bg-primary/5 rounded-3xl border border-primary/10'>
                    <View className='flex-row items-center gap-4'>
                        <View className='w-20 h-20 rounded-full bg-primary flex-center'>
                            <Text className='text-3xl font-rubik-bold text-white'>👨‍🌾</Text>
                        </View>
                        <View className='flex-1'>
                            <Text className='base-bold text-dark-100'>Welcome User</Text>
                            <Text className='body-regular text-gray-100 mt-1'>user@example.com</Text>
                            <View className='flex-row items-center gap-2 mt-2'>
                                <View className='bg-success/20 px-3 py-1 rounded-full'>
                                    <Text className='text-xs font-rubik-semibold text-success'>⭐ Member</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View className='flex-row mx-5 mb-6 gap-3'>
                    <View className='flex-1 p-4 bg-white rounded-2xl border border-gray-200/30' style={Platform.OS === 'android' ? { elevation: 2 } : {}}>
                        <Text className='text-2xl font-rubik-bold text-primary text-center'>12</Text>
                        <Text className='body-regular text-gray-100 text-center mt-1'>Orders</Text>
                    </View>
                    <View className='flex-1 p-4 bg-white rounded-2xl border border-gray-200/30' style={Platform.OS === 'android' ? { elevation: 2 } : {}}>
                        <Text className='text-2xl font-rubik-bold text-primary text-center'>5</Text>
                        <Text className='body-regular text-gray-100 text-center mt-1'>Favorites</Text>
                    </View>
                    <View className='flex-1 p-4 bg-white rounded-2xl border border-gray-200/30' style={Platform.OS === 'android' ? { elevation: 2 } : {}}>
                        <Text className='text-2xl font-rubik-bold text-primary text-center'>8</Text>
                        <Text className='body-regular text-gray-100 text-center mt-1'>Reviews</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className='px-5 pb-32'>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => item.route && router.push(item.route)}
                            className='flex-row items-center justify-between py-4 border-b border-gray-200/30'
                        >
                            <View className='flex-row items-center gap-3'>
                                <View className='w-10 h-10 bg-primary/10 rounded-full flex-center'>
                                    <Ionicons name={item.icon as any} size={20} color="#598216" />
                                </View>
                                <Text className='paragraph-semibold text-dark-100'>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#878787" />
                        </TouchableOpacity>
                    ))}

                    {/* Logout Button */}
                    <TouchableOpacity
                        onPress={handleLogout}
                        className='mt-6 p-4 bg-error/10 rounded-2xl flex-row items-center justify-center gap-2'
                    >
                        <Ionicons name="log-out-outline" size={20} color="#F14141" />
                        <Text className='paragraph-semibold text-error'>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile

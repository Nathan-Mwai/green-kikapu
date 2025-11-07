

import { Text, TouchableOpacity, Image, Platform, View} from 'react-native'
import React from 'react'
import {MenuItem} from "@/type";
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const MenuCard = ({item:{image_url,name,price}}:{item:MenuItem}) => {

    const handlePress = () => {
        router.push({
            pathname: '/menu-details',
            params: {
                name,
                price,
                image_url
            }
        })
    }

    return (
        <TouchableOpacity
            className={'menu-card relative'}
            style={Platform.OS=== 'android' ? {elevation:5, shadowColor:'#878787'}:{}}
            onPress={handlePress}
        >
            {/* Fresh badge */}
            {/*<View className={'absolute top-3 right-3 bg-success/90 px-2 py-1 rounded-full'}>*/}
                {/*<Text className={'text-xs font-rubik-bold text-white'}>✨ Fresh</Text>*/}
            {/*</View>*/}

            <Image source={{uri:image_url}} className='size-32 absolute -top-10' resizeMode={"contain"}/>

            <Text className={'text-center paragraph-bold text-dark-100 mb-1'} numberOfLines={1}>{name}</Text>

            <View className={'flex-row items-center justify-between w-full'}>
                {/*<Text className={'body-medium text-primary'}>Ksh {price}</Text>*/}
                {/*<View className={'bg-primary/10 w-8 h-8 rounded-full flex-center'}>*/}
                    {/*<Ionicons name="add" size={20} color="#598216" />*/}
                {/*</View>*/}
            </View>
        </TouchableOpacity>
    )
}
export default MenuCard

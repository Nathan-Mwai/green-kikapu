import { Text, TouchableOpacity, Image, Platform} from 'react-native'
import React from 'react'
import {MenuItem} from "@/type";
import { router } from 'expo-router'

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
            className={'menu-card'} 
            style={Platform.OS=== 'android' ? {elevation:10, shadowColor:'#878787'}:{}}
            onPress={handlePress}
        >
            <Image source={{uri:image_url}} className='size-32 absolute -top-10' resizeMode={"contain"}/>
            <Text className={'text-center base-bold text-dark-100 mb-2'} numberOfLines={1}>{name}</Text>
            {/*<Text className={'body-regular text-gray-200 mb-4'}>Ksh {price}</Text>*/}
            {/*<TouchableOpacity onPress={()=>{}}>*/}
                {/*<Text className={'paragraph-bold'}>Add to Cart +</Text>*/}
            {/*</TouchableOpacity>*/}
        </TouchableOpacity>
    )
}
export default MenuCard

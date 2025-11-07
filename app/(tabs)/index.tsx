import {FlatList, Text, View, TouchableOpacity, Platform} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {categories, offers} from "@/constants";
import MenuCard from "@/components/MenuCard";
import {MenuItem} from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useCartStore from '@/store/cart.store';

const Index = () => {
    const { getItemCount } = useCartStore()
    const itemCount = getItemCount()

    return (
        <SafeAreaView className={'bg-white h-full'}>
            <FlatList
                data={offers}
                renderItem={({item, index})=>{
                    return(
                        <View className={'flex-1 max-w-[48%]'}>
                            <MenuCard item={item as MenuItem}/>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperClassName='gap-7'
                contentContainerClassName='gap-7 px-5 pb-32'
                ListHeaderComponent={()=>(
                    <View className={'my-5 gap-5'}>
                        {/*This is the header*/}

                        <View className={'flex-between flex-row w-full'}>
                            <View className={'flex-start'}>
                                <Text className={'text-lg font-rubik-bold text-primary'}>🌱 Hello!</Text>
                                <View className={'flex-start flex-row gap-x-1 mt-0.5'}>
                                    <Ionicons name="location" size={16} color="#598216" />
                                    <Text className={'paragraph-semibold text-dark-100'}>Nairobi</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/cart')}
                                className={'relative w-12 h-12 rounded-full bg-primary/10 flex-center'}
                                style={Platform.OS === 'android' ? { elevation: 2 } : {}}
                            >
                                <Ionicons name="cart" size={24} color="#598216" />
                                {itemCount > 0 && (
                                    <View className={'absolute -top-1 -right-1 bg-error w-5 h-5 rounded-full flex-center'}>
                                        <Text className={'text-white text-xs font-rubik-bold'}>{itemCount}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Creative wave separator inspired by Duolingo */}
                        <View className={'relative w-full h-12 -mt-2 -mb-2'}>
                            <View className={'absolute inset-0 flex-row items-center justify-center'}>
                                <View className={'flex-1 h-[2px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/30'} style={{ backgroundColor: '#598216', opacity: 0.15 }} />
                                <View className={'mx-3 px-4 py-1.5 bg-primary/10 rounded-full'}>
                                    <Text className={'text-xs font-rubik-bold text-primary'}>✨ Fresh Today</Text>
                                </View>
                                <View className={'flex-1 h-[2px] bg-gradient-to-r from-primary/30 to-primary/0'} style={{ backgroundColor: '#598216', opacity: 0.15 }} />
                            </View>
                        </View>

                        {/*This is for categories*/}
                        <View className={'w-full mt-2'}>
                            <View className={'flex-row items-center gap-2 mb-1'}>
                                <Text className={'text-2xl font-rubik-bold text-dark-100'}>Explore</Text>
                                <Text className={'text-2xl'}>🥬</Text>
                            </View>
                            <Text className={'body-regular text-gray-100'}>Fresh organic produce from local farmers</Text>
                        </View>

                        <SearchBar/>
                        <Filter categories={categories}/>
                    </View>
                )}

                ListEmptyComponent={() => <Text>No results</Text>}
            />
        </SafeAreaView>
    )
}
export default Index
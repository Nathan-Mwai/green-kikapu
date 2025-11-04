import {FlatList, Pressable, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {offers} from "@/constants";
import MenuCard from "@/components/MenuCard";
import {MenuItem} from "@/type";

const Index = () => {
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
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperClassName='gap-7'
                contentContainerClassName='gap-7 px-5 pb-32'
                ListHeaderComponent={()=>(
                    <View className={'my-5 gap-5'}>
                        <View className={'flex-between flex-row w-full'}>
                            <View className={'flex-start'}>
                                <Text className={'small-bold uppercase'}>Search</Text>
                                <View className={'flex-start flex-row gap-x-1 mt-0.5'}>
                                    <Text className={'paragraph-semibold text-dark-100'}>Find your favorite food</Text>
                                </View>
                            </View>

                            <Text>CartButton</Text>
                        </View>
                        <Text>Search Input</Text>
                        <Text>Filter</Text>
                    </View>
                )}

                ListEmptyComponent={() => !loading && <Text>No results</Text>}
            />
        </SafeAreaView>
    )
}
export default Index
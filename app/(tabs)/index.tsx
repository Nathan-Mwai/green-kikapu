import {FlatList, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {categories, offers} from "@/constants";
import MenuCard from "@/components/MenuCard";
import {MenuItem} from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

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
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperClassName='gap-7'
                contentContainerClassName='gap-7 px-5 pb-32'
                ListHeaderComponent={()=>(
                    <View className={'my-5 gap-5'}>
                        {/*This is the header*/}

                        <View className={'flex-between flex-row w-full'}>
                            <View className={'flex-start'}>
                                <Text className={'small-bold uppercase'}>Welcome User</Text>
                                <View className={'flex-start flex-row gap-x-1 mt-0.5'}>
                                    <Text className={'paragraph-semibold text-dark-100'}>Deliver to Nairobi</Text>
                                </View>
                            </View>

                            <Text>CartButton</Text>
                        </View>

                            <View className={'w-full h-[1px] bg-gray-200'} />

                        {/*This is for categories*/}
                        <View className={'flex-between flex-row w-full'}>
                            <View className={'flex-start'}>
                                <Text className={'small-bold uppercase'}>Categories and Search</Text>
                                <View className={'flex-start flex-row gap-x-1 mt-0.5'}>
                                    <Text className={'paragraph-semibold text-dark-100'}>Find your favorite food</Text>
                                </View>
                            </View>

                            <Text>CartButton</Text>
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
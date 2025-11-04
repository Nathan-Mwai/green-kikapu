import {Text, FlatList, TouchableOpacity, Platform} from 'react-native'
import React from 'react'
import type { Category } from "@/type";

const Filter = ({ categories }: { categories: Category[] }) => {
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.name}
            contentContainerClassName={'gap-x-2 pb-3'}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.name}
                    // CN utility class
                    className={'filter'}
                    style={Platform.OS==='android'? {elevation:5 , shadowColor:"#878787"}:{}}
                    // onPress={handlePress(item.$id)}
                >
                    <Text className={'body-medium'}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default Filter

import {Text, FlatList, TouchableOpacity, Platform} from 'react-native'
import React, { useState } from 'react'
import type { Category } from "@/type";
import cn from 'clsx'

const categoryEmojis: Record<string, string> = {
    'Cabbage': '🥬',
    'Carrot': '🥕',
    'Tomato': '🍅',
    'Onion': '🧅',
    'Potato': '🥔',
}

const Filter = ({ categories }: { categories: Category[] }) => {
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.name}
            contentContainerClassName={'gap-x-3 pb-3'}
            renderItem={({ item }) => {
                const isSelected = selected === item.name
                return (
                    <TouchableOpacity
                        key={item.name}
                        className={cn(
                            'filter',
                            isSelected ? 'bg-primary' : 'bg-white'
                        )}
                        style={Platform.OS==='android'? {elevation:3}:{}}
                        onPress={() => setSelected(isSelected ? null : item.name)}
                    >
                        <Text className={'body-medium'}>
                            {categoryEmojis[item.name] || '🌱'}
                        </Text>
                        <Text className={cn(
                            'body-medium ml-1',
                            isSelected ? 'text-white' : 'text-dark-100'
                        )}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}
export default Filter

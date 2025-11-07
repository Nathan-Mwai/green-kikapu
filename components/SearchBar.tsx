import {View, TextInput, TouchableOpacity, Platform} from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons'

const SearchBar = () => {
    const [query, setQuery] = useState('')

    const handleSearch = (text: string) => {
        setQuery(text)
    }

    const handleClear = () => {
        setQuery('')
    }

    return (
        <View
            className={'searchbar'}
            style={Platform.OS === 'android' ? { elevation: 3 } : {}}
        >
            <View className={'pl-5 pr-2'}>
                <Ionicons name="search" size={20} color="#878787" />
            </View>
            <TextInput
                className={'flex-1 py-4 pr-2 font-rubik text-dark-100'}
                placeholder={'Search fresh produce...'}
                value={query}
                onChangeText={handleSearch}
                placeholderTextColor={'#A0A0A0'}
                returnKeyType={"search"}
            />
            {query.length > 0 && (
                <TouchableOpacity
                    className={'pr-5'}
                    onPress={handleClear}
                >
                    <Ionicons name="close-circle" size={20} color="#878787" />
                </TouchableOpacity>
            )}
        </View>
    )
}
export default SearchBar

import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'

const SearchBar = () => {
    const [query, setQuery] = useState()


    const handleSearch = (text: string) => {
        setQuery(text)
    }

    return (
        <View className={'searchbar'}>
            <TextInput
                className={'flex-1 p-5'}
                placeholder={'Search for vegetables....'}
                value={query}
                onChangeText={handleSearch}
                // onSubmitEditing={handleSubmit}
                placeholderTextColor={'#A0A0A0'}
                returnKeyType={"search"}
            />
            <TouchableOpacity
                className={'pr-5'}
                onPress={()=> console.log("Oh no stop...")}
            >
                <Text>Click</Text>
                {/*<Image className="size-6" resizeMode="contain" tintColor="#5D5F6D"/> Images to come from assets */}
            </TouchableOpacity>
        </View>
    )
}
export default SearchBar

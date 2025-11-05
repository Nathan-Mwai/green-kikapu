import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Image} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import useAuthStore from "@/store/auth.store";


export default function AuthLayout() {
    const {isAuthenticated} = useAuthStore()
    if(isAuthenticated) return <Redirect href={'/'}/>
    return (
        <KeyboardAvoidingView behavior={Platform.OS=== 'ios'? 'padding' : 'height'}>
            <ScrollView className={'bg-white h-full'} keyboardShouldPersistTaps="handled">
                <View className={'w-full relative'} style={{height: Dimensions.get("window").height/2.25}}>
                    {/*Will be the image on top */}
                    {/*<Image className="size-full rounded-b-lg" resizeMode="stretch" />*/}
                    {/*Could be the company's logo*/}
                    {/*<Image className="self-center size-48 absolute -bottom-16 z-10" resizeMode="stretch" />*/}
                </View>
            <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

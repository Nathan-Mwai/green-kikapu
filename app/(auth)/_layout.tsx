import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Slot} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

export default function AuthLayout() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS=== 'ios'? 'padding' : 'height'}>
            <ScrollView className={'bg-white h-full'} keyboardShouldPersistTaps="handled">
                <View className={'w-full relative'} style={{height: Dimensions.get("screen").height/2.25}}>
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

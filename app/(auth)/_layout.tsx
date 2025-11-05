import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Slot} from "expo-router";

/**
 * Layout wrapper for authentication-related routes.
 *
 * @returns A React element that renders a safe area view with a header and a Slot for nested routes.
 */
export default function AuthLayout() {
    return (
        <SafeAreaView>
            <Text>AuthLayout</Text>
            <Slot/>
        </SafeAreaView>
    )
}
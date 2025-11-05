import { Stack } from "expo-router";
import {
    useFonts,
    Rubik_400Regular,
    Rubik_700Bold,
    Rubik_600SemiBold,
    Rubik_500Medium,
    Rubik_300Light
} from '@expo-google-fonts/rubik'
import "./global.css"
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
        Rubik_600SemiBold,
        Rubik_500Medium,
        Rubik_300Light,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

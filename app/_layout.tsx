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

/**
 * Root layout component that loads Rubik fonts, hides the splash screen when loading completes or fails, and renders the app navigation.
 *
 * Hides the splash screen once fonts are loaded or a font-loading error occurs. While fonts are still loading and no error has occurred, nothing is rendered.
 *
 * @returns The app's root Stack navigator with headers hidden, or `null` while fonts are loading. 
 */
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
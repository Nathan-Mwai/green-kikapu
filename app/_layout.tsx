import { Stack } from "expo-router";
import {useFonts, Rubik_900Black} from '@expo-google-fonts/rubik'
import "../global.css"
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Rubik_900Black,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

  return (
      <Stack screenOptions={{
          headerTitleStyle:{ fontFamily:"Rubik_900Black"}
      }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/*<Stack.Screen name="+not-found" options={{ headerShown: false }} />*/}
      </Stack>
  )
}

import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router/js-stack";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
   Manrope_400Regular,
   Manrope_500Medium,
   Manrope_600SemiBold,
   Manrope_700Bold,
   Manrope_800ExtraBold,
   useFonts,
} from "@expo-google-fonts/manrope";
import { DrawerToggleButton } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { NotificationProvider } from "../context/NotificationContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Manrope_400Regular,
      Manrope_500Medium,
      Manrope_600SemiBold,
      Manrope_700Bold,
      Manrope_800ExtraBold,
   });

   useEffect(() => {
      if (fontsLoaded) {
         SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   return (
      <NotificationProvider>
         <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Stack>
               <Stack.Screen
                  name="(drawer)"
                  options={{
                     headerLeft: () => <DrawerToggleButton />,
                     headerShown: false,
                  }}
               />
            </Stack>
         </GestureHandlerRootView>
      </NotificationProvider>
   );
}

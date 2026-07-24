import * as SplashScreen from "expo-splash-screen";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
   Manrope_400Regular,
   Manrope_500Medium,
   Manrope_600SemiBold,
   Manrope_700Bold,
   Manrope_800ExtraBold,
   useFonts,
} from "@expo-google-fonts/manrope";
import { StatusBar } from "expo-status-bar";
import { NotificationProvider } from "../context/NotificationContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { useEffect, memo } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { usePathname, useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomDrawerContent from "./drawer-content";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 400 });

const HEADER_TITLES: Record<string, string> = {
   dashboard: "Travessia Fácil",
   cameras: "Câmeras ao Vivo",
   info: "Tarifas e Informações",
   config: "Configurações",
};

const styles = StyleSheet.create({
   headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: -0.5,
   },
});

const DynamicHeaderTitle = memo(function DynamicHeaderTitle() {
   const { colors } = useTheme();
   const pathname = usePathname();
   const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
   return (
      <Text style={[styles.headerTitle, { color: colors.text }]}>
         {HEADER_TITLES[segment] ?? "Travessia Fácil"}
      </Text>
   );
});

const DrawerToggle = memo(function DrawerToggle() {
   const { colors } = useTheme();
   const navigation = useNavigation<any>();

   return (
      <Pressable onPress={() => navigation.toggleDrawer()} hitSlop={12}>
         <MaterialCommunityIcons name="menu" size={24} color={colors.primaryDark} />
      </Pressable>
   );
});

function RootLayoutInner() {
   const { isDark, colors } = useTheme();
   const { width } = useWindowDimensions();
   const isWide = width >= 768;

   useEffect(() => {
      SplashScreen.hideAsync();
   }, []);

   return (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
         <StatusBar style={isDark ? "light" : "dark"} />
         <Drawer
            screenOptions={{
               drawerStyle: {
                  width: isWide ? 320 : 280,
                  backgroundColor: colors.drawerBg,
               },
               headerShown: true,
               headerTitle: () => <DynamicHeaderTitle />,
               headerLeft: () => (
                  <View style={{ paddingLeft: 12 }}>
                     <DrawerToggle />
                  </View>
               ),
               headerStyle: {
                  backgroundColor: colors.background,
                  elevation: 9,
               },
               headerShadowVisible: false,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
         >
            <Drawer.Screen
               name="(drawer)"
               options={{
                  title: "Home",
               }}
            />
         </Drawer>
      </GestureHandlerRootView>
   );
}

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Manrope_400Regular,
      Manrope_500Medium,
      Manrope_600SemiBold,
      Manrope_700Bold,
      Manrope_800ExtraBold,
   });

   if (!fontsLoaded) {
      return null;
   }

   return (
      <ThemeProvider>
         <NotificationProvider>
            <RootLayoutInner />
         </NotificationProvider>
      </ThemeProvider>
   );
}

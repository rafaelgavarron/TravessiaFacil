import { Drawer, DrawerToggleButton } from "expo-router/drawer";
import {
   View,
   Text,
   Pressable,
   StyleSheet,
   useWindowDimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo } from "react";

const NAV_ITEMS = [
   {
      label: "Dashboard",
      route: "/(drawer)/(tabs)/dashboard" as const,
      icon: "view-dashboard-outline" as const,
      iconFocused: "view-dashboard" as const,
   },
   {
      label: "Câmeras",
      route: "/(drawer)/(tabs)/cameras" as const,
      icon: "camera-outline" as const,
      iconFocused: "camera" as const,
   },
   {
      label: "Informações",
      route: "/(drawer)/(tabs)/info" as const,
      icon: "information-outline" as const,
      iconFocused: "information" as const,
   },
];

function CustomDrawerContent({ navigation }: { navigation: any }) {
   const router = useRouter();
   const pathname = usePathname();
   const insets = useSafeAreaInsets();

   const activeSegment = useMemo(() => {
      const seg = pathname.split("/").pop() ?? "";
      return seg;
   }, [pathname]);

   const handleItemPress = (route: string) => {
      router.replace(route as any);
      navigation.closeDrawer();
   };

   return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Travessia Fácil</Text>
         </View>

         <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
               const itemSegment = item.route.split("/").pop() ?? "";
               const isActive = activeSegment === itemSegment;
               return (
                  <Pressable
                     key={item.route}
                     style={({ pressed }) => [
                        styles.navItem,
                        isActive && styles.navItemActive,
                        pressed && styles.navItemPressed,
                     ]}
                     onPress={() => handleItemPress(item.route)}
                  >
                     <MaterialCommunityIcons
                        name={isActive ? item.iconFocused : item.icon}
                        size={24}
                        color={isActive ? "#000A7F" : "#555"}
                     />
                     <Text
                        style={
                           isActive ? styles.navLabelActive : styles.navLabel
                        }
                     >
                        {item.label}
                     </Text>
                  </Pressable>
               );
            })}
         </View>
      </View>
   );
}

export default function Layout() {
   const { width } = useWindowDimensions();
   const isWide = width >= 768;

   return (
      <Drawer
         drawerContent={(props) => (
            <CustomDrawerContent navigation={props.navigation} />
         )}
         screenOptions={{
            drawerStyle: {
               width: isWide ? "40%" : "60%",
            },
         }}
      >
         <Drawer.Screen
            name="(tabs)"
            options={{
               title: "Travessia Fácil",
               headerShown: true,
               headerLeft: () => (
                  <View style={{ paddingLeft: 12 }}>
                     <DrawerToggleButton />
                  </View>
               ),
               headerStyle: {
                  backgroundColor: "#F8F9FA",
                  elevation: 9,
               },
               headerShadowVisible: false,
            }}
         />
      </Drawer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
   },
   header: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
   },
   headerTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: "#1A1A1A",
   },
   navList: {
      paddingTop: 16,
      paddingHorizontal: 12,
      gap: 4,
   },
   navItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      gap: 12,
   },
   navItemActive: {
      backgroundColor: "#D5E3FF",
   },
   navItemPressed: {
      opacity: 0.7,
   },
   navLabel: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      color: "#43474F",
   },
   navLabelActive: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      color: "#001E40",
   },
});

import { Drawer } from "expo-router/drawer";
import {
   View,
   Text,
   Pressable,
   StyleSheet,
   useWindowDimensions,
} from "react-native";
import { useRouter, usePathname, useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useCallback, memo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const HEADER_TITLES: Record<string, string> = {
   dashboard: "Travessia Fácil",
   cameras: "Câmeras ao Vivo",
   info: "Tarifas e Informações",
   config: "Configurações",
};

// Memoizar DynamicHeaderTitle
const DynamicHeaderTitle = memo(function DynamicHeaderTitle() {
   const pathname = usePathname();
   const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
   return (
      <Text style={styles.headerTitle}>
         {HEADER_TITLES[segment] ?? "Travessia Fácil"}
      </Text>
   );
});

// Memoizar DrawerToggle
const DrawerToggle = memo(function DrawerToggle() {
   const navigation = useNavigation() as any;
   const handleToggle = useCallback(() => {
      navigation.toggleDrawer();
   }, [navigation]);

   return (
      <Pressable onPress={handleToggle} hitSlop={12}>
         <MaterialCommunityIcons name="menu" size={24} color="#001E40" />
      </Pressable>
   );
});

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
      icon: "videocam-outline" as const,
      iconFocused: "videocam" as const,
      iconFamily: "Ionicons" as const,
   },
   {
      label: "Informações",
      route: "/(drawer)/(tabs)/info" as const,
      icon: "information-outline" as const,
      iconFocused: "information" as const,
   },
   {
      label: "Configurações",
      route: "/(drawer)/(tabs)/config" as const,
      icon: "settings-outline" as const,
      iconFocused: "settings-sharp" as const,
      iconFamily: "Ionicons" as const,
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

   const handleItemPress = useCallback(
      (route: string) => {
         router.replace(route as any);
         navigation.closeDrawer();
      },
      [router, navigation],
   );

   return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Travessia Fácil</Text>
         </View>

         <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
               const itemSegment = item.route.split("/").pop() || "";
               return (
                  <NavItem
                     key={item.route}
                     item={item}
                     isActive={activeSegment === itemSegment}
                     onPress={() => handleItemPress(item.route)}
                  />
               );
            })}
         </View>
      </View>
   );
}

// Memoizar NavItem
const NavItem = memo(function NavItem({
   item,
   isActive,
   onPress,
}: {
   item: (typeof NAV_ITEMS)[number];
   isActive: boolean;
   onPress: () => void;
}) {
   return (
      <Pressable
         style={({ pressed }) => [
            styles.navItem,
            isActive && styles.navItemActive,
            pressed && styles.navItemPressed,
         ]}
         onPress={onPress}
      >
         {item.iconFamily === "Ionicons" ? (
            <Ionicons
               name={isActive ? item.iconFocused : item.icon}
               size={24}
               color={isActive ? "#000A7F" : "#555"}
            />
         ) : (
            <MaterialCommunityIcons
               name={isActive ? item.iconFocused : item.icon}
               size={24}
               color={isActive ? "#000A7F" : "#555"}
            />
         )}
         <Text style={isActive ? styles.navLabelActive : styles.navLabel}>
            {item.label}
         </Text>
      </Pressable>
   );
});

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
               headerTitle: () => <DynamicHeaderTitle />,
               headerShown: true,
               headerLeft: () => (
                  <View style={{ paddingLeft: 12 }}>
                     <DrawerToggle />
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
      marginLeft: 10,
      fontSize: 22,
      fontWeight: "700",
      color: "#1A1A1A",
      fontFamily: "Manrope_700Bold",
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

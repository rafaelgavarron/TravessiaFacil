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
import { NotificationBadge } from "../../components/NotificationBadge";

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
   {
      label: "Alertas e notificações",
      route: "/(drawer)/(tabs)/alerts" as const,
      icon: "notifications-outline" as const,
      iconFocused: "notifications" as const,
      iconFamily: "Ionicons" as const,
   },
   {
      label: "Ajuda e Suporte",
      route: "/(drawer)/(tabs)/about" as const,
      icon: "help-circle-outline" as const,
      iconFocused: "help-circle" as const,
      iconFamily: "MaterialIcons" as const,
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
         {/* Left accent bar */}
         <View style={styles.accent} />

         <View style={styles.header}>
            <Text style={styles.headerTitle}>Travessia Fácil</Text>
         </View>

         <View style={styles.separator} />

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

         <View style={styles.separator} />

         <View style={styles.footer}>
            <Pressable
               style={({ pressed }) => [styles.logoutButton, pressed && styles.navItemPressed]}
               onPress={() => {
                  router.replace("/");
                  navigation.closeDrawer();
               }}
            >
               <MaterialCommunityIcons name="logout" size={20} color="#D1302B" />
               <Text style={styles.logoutText}>Sair</Text>
            </Pressable>

            <Text style={styles.versionText}>VERSÃO 1.0.0</Text>
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
   const isAlertsItem = item.label === "Alertas e notificações";

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
         <View style={styles.labelContainer}>
            <Text style={isActive ? styles.navLabelActive : styles.navLabel}>
               {item.label}
            </Text>
         </View>
         {isAlertsItem && (
            <View style={styles.badgeContainer}>
               <NotificationBadge size="small" />
            </View>
         )}
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
               width: isWide ? 320 : 280,
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
      backgroundColor: "#FFFFFF",
   },
   accent: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 6,
      backgroundColor: "#0B66D0",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
   },
   header: {
      paddingHorizontal: 24,
      paddingBottom: 24,
   },
   headerTitle: {
      marginLeft: 10,
      fontSize: 20,
      fontWeight: "700",
      color: "#1A1A1A",
      fontFamily: "Manrope_700Bold",
   },
   separator: {
      height: 1,
      backgroundColor: "#F0F2F5",
      marginHorizontal: 12,
   },
   navList: {
      paddingTop: 8,
      paddingHorizontal: 12,
      gap: 4,
   },
   navItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingLeft: 8,
      paddingRight: 12,
      borderRadius: 12,
      gap: 12,
   },
   navItemActive: {
      backgroundColor: "#F1F6FF",
   },
   navItemPressed: {
      opacity: 0.7,
   },
   labelContainer: {
      flex: 1,
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
   badgeContainer: {
      justifyContent: "center",
      alignItems: "center",
   },
   footer: {
      marginTop: "auto",
      paddingHorizontal: 18,
      paddingVertical: 18,
      alignItems: "center",
   },
   logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: "#FFF6F5",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      width: "100%",
   },
   logoutText: {
      color: "#D1302B",
      fontSize: 16,
      fontFamily: "Manrope_700Bold",
   },
   versionText: {
      marginTop: 12,
      color: "#BFC6CF",
      fontSize: 12,
      letterSpacing: 1.5,
   },
});

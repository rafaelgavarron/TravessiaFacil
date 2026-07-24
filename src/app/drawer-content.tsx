import { View, Text, Pressable, StyleSheet, BackHandler } from "react-native";
import { useRouter, usePathname } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useCallback, memo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotificationBadge } from "../components/NotificationBadge";
import { Alert } from "react-native";
import { useTheme } from "@/context";

const MAIN_NAV_ITEMS = [
   {
      label: "Dashboard",
      route: "/(tabs)/dashboard" as const,
      icon: "view-dashboard-outline" as const,
      iconFocused: "view-dashboard" as const,
   },
   {
      label: "Câmeras",
      route: "/(tabs)/cameras" as const,
      icon: "videocam-outline" as const,
      iconFocused: "videocam" as const,
      iconFamily: "Ionicons" as const,
   },
   {
      label: "Informações",
      route: "/(tabs)/info" as const,
      icon: "information-outline" as const,
      iconFocused: "information" as const,
   },
   // {
   //    label: "Alertas e notificações",
   //    route: "/(tabs)/alerts" as const,
   //    icon: "notifications-outline" as const,
   //    iconFocused: "notifications" as const,
   //    iconFamily: "Ionicons" as const,
   // },
];

const SETTINGS_NAV_ITEMS = [
   {
      label: "Configurações",
      route: "/(tabs)/config" as const,
      icon: "settings-outline" as const,
      iconFocused: "settings-sharp" as const,
      iconFamily: "Ionicons" as const,
   },
   {
      label: "Ajuda e Suporte",
      route: "/(tabs)/about" as const,
      icon: "help-circle-outline" as const,
      iconFocused: "help-circle" as const,
      iconFamily: "MaterialIcons" as const,
   },
];

const NavItem = memo(function NavItem({
   item,
   isActive,
   onPress,
}: {
   item: (typeof MAIN_NAV_ITEMS)[number] | (typeof SETTINGS_NAV_ITEMS)[number];
   isActive: boolean;
   onPress: () => void;
}) {
   const { colors } = useTheme();
   const isAlertsItem = item.label === "Alertas e notificações";

   return (
      <Pressable
         style={({ pressed }) => [
            styles.navItem,
            isActive && { backgroundColor: colors.surfaceVariant },
            pressed && styles.navItemPressed,
         ]}
         onPress={onPress}
      >
         {item.iconFamily === "Ionicons" ? (
            <Ionicons
               name={isActive ? item.iconFocused : item.icon}
               size={24}
               color={isActive ? colors.primary : colors.tabInactive}
            />
         ) : (
            <MaterialCommunityIcons
               name={isActive ? item.iconFocused : item.icon}
               size={24}
               color={isActive ? colors.primary : colors.tabInactive}
            />
         )}
         <View style={styles.labelContainer}>
            <Text style={isActive ? [styles.navLabelActive, { color: colors.primaryDark }] : [styles.navLabel, { color: colors.textSecondary }]}>
               {item.label}
            </Text>
         </View>
         {/*{isAlertsItem && (
            <View style={styles.badgeContainer}>
               <NotificationBadge size="small" />
            </View>
         )}*/}
      </Pressable>
   );
});

export default function CustomDrawerContent({
   navigation,
}: {
   navigation: any;
}) {
   const { colors } = useTheme();
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

   const closeApp = () => {
      Alert.alert("Sair", "Tem certeza que deseja sair?", [
         { text: "Cancelar", style: "cancel" },
         {
            text: "Sair",
            style: "destructive",
            onPress: () => BackHandler.exitApp(),
         },
      ]);
   };

   return (
      <View
         style={[
            styles.container,
            { backgroundColor: colors.drawerBg, paddingTop: insets.top + 16, paddingBottom: insets.bottom },
         ]}
      >
         {/* Left accent bar */}
         <View style={[styles.accent, { backgroundColor: colors.drawerAccent }]} />

         <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Travessia Fácil</Text>
         </View>

         <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />

         {/* Main navigation items */}
         <View style={styles.navList}>
            {MAIN_NAV_ITEMS.map((item) => {
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

         <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />

         {/* Settings navigation items */}
         <View style={styles.navList}>
            {SETTINGS_NAV_ITEMS.map((item) => {
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

         <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />

         <View style={styles.footer}>
            <Pressable
               style={({ pressed }) => [
                  styles.logoutButton,
                  { backgroundColor: colors.dangerBg },
                  pressed && styles.navItemPressed,
               ]}
               onPress={() => {
                  router.replace("/");
                  navigation.closeDrawer();
                  closeApp();
               }}
            >
               <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={colors.dangerLight}
               />
               <Text style={[styles.logoutText, { color: colors.dangerLight }]}>Sair</Text>
            </Pressable>

            <Text style={[styles.versionText, { color: colors.textMuted }]}>VERSÃO 1.0.0</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   accent: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 6,
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
      fontFamily: "Manrope_700Bold",
   },
   separator: {
      height: 1,
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
   navItemPressed: {
      opacity: 0.7,
   },
   labelContainer: {
      flex: 1,
   },
   navLabel: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
   },
   navLabelActive: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
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
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      width: "100%",
   },
   logoutText: {
      fontSize: 16,
      fontFamily: "Manrope_700Bold",
   },
   versionText: {
      marginTop: 12,
      fontSize: 12,
      letterSpacing: 1.5,
   },
});

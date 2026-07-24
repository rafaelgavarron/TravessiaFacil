import { memo } from "react";
import { Tabs } from "expo-router";
import { useWindowDimensions, Pressable, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { useTheme } from "@/context";

const HEADER_TITLES: Record<string, string> = {
   dashboard: "Travessia Fácil",
   cameras: "Câmeras ao Vivo",
   info: "Tarifas e Informações",
   config: "Configurações",
};

const DynamicHeaderTitle = memo(function DynamicHeaderTitle() {
   const pathname = usePathname();
   const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
   return (
      <Text
         style={{
            fontSize: 18,
            fontWeight: "700",
            fontFamily: "Manrope_700Bold",
         }}
      >
         {HEADER_TITLES[segment] ?? "Travessia Fácil"}
      </Text>
   );
});

const CustomTabButton = memo(function CustomTabButton(props: any) {
   return (
      <Pressable
         onPress={props.onPress}
         onLongPress={props.onLongPress}
         style={props.style}
         accessibilityState={props.accessibilityState}
      >
         {props.children}
      </Pressable>
   );
});

const NoFeedbackTabButton = memo(function NoFeedbackTabButton(props: any) {
   return (
      <Pressable
         onPress={props.onPress}
         onLongPress={props.onLongPress}
         style={({ pressed }) => [
            props.style,
            pressed && { opacity: 1 }, // Remove efeito de opacidade
         ]}
         accessibilityState={props.accessibilityState}
      >
         {props.children}
      </Pressable>
   );
});

export default function TabLayout() {
   const { width } = useWindowDimensions();
   const insets = useSafeAreaInsets();
   const isWide = width >= 768;
   const { colors } = useTheme();

   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
             tabBarInactiveTintColor: colors.tabInactive,
             tabBarLabelStyle: {
                fontFamily: "Manrope_600SemiBold",
                fontSize: 12,
             },
             tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
               paddingBottom: isWide ? 0 : insets.bottom,
               height: isWide ? undefined : 55 + insets.bottom,
            },
            tabBarPosition: isWide ? "top" : "bottom",
            headerTitle: () => <DynamicHeaderTitle />,
            tabBarButton: (props) => <NoFeedbackTabButton {...props} />,
         }}
      >
         <Tabs.Screen
            name="dashboard"
            options={{
               title: "Dashboard",
               tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                     name={
                        focused ? "view-dashboard" : "view-dashboard-outline"
                     }
                     size={24}
                      color={focused ? colors.primary : colors.tabInactive}
                   />
                ),
             }}
          />
          <Tabs.Screen
             name="cameras"
            options={{
               title: "Câmeras",
               tabBarIcon: ({ focused }) => (
                  <Ionicons
                     name={focused ? "videocam" : "videocam-outline"}
                     size={24}
                      color={focused ? colors.primary : colors.tabInactive}
                   />
                ),
             }}
          />
          <Tabs.Screen
             name="info"
            options={{
               title: "Informações",
               tabBarIcon: ({ focused }) => (
                  <MaterialCommunityIcons
                     name={focused ? "information" : "information-outline"}
                     size={24}
                      color={focused ? colors.primary : colors.tabInactive}
                   />
                ),
             }}
          />
          <Tabs.Screen name="dashboard/paralyzed" options={{ href: null }} />
         <Tabs.Screen
            name="config"
            options={{
               title: "Configurações",
               href: null,
            }}
         />
         <Tabs.Screen
            name="alerts"
            options={{
               title: "Alertas e notificações",
               href: null,
            }}
         />
         <Tabs.Screen
            name="about"
            options={{
               title: "Sobre",
               href: null,
            }}
         />
         <Tabs.Screen
            name="taxes"
            options={{
               title: "Tarifas",
               href: null,
            }}
         />
      </Tabs>
   );
}

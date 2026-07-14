import { Tabs } from "expo-router";
import { useWindowDimensions, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
   const { width } = useWindowDimensions();
   const isWide = width >= 768;

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: "#000A7F",
            tabBarInactiveTintColor: "#555",
            tabBarLabelStyle: {
               fontFamily: "Manrope_600SemiBold",
               fontSize: 12,
            },
            tabBarStyle: {
               backgroundColor: "#FFF",
               borderTopWidth: 1,
               borderTopColor: "#E0E0E0",
            },
            tabBarPosition: isWide ? "top" : "bottom",
            headerShown: false,
            tabBarButton: (props) => (
               <Pressable
                  onPress={props.onPress}
                  onLongPress={props.onLongPress}
                  style={props.style}
                  accessibilityState={props.accessibilityState}
               >
                  {props.children}
               </Pressable>
            ),
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
                     color={focused ? "#000A7F" : "#555"}
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
                     color={focused ? "#000A7F" : "#555"}
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
                      color={focused ? "#000A7F" : "#555"}
                   />
                ),
             }}
          />
          <Tabs.Screen
             name="config"
             options={{
                title: "Configurações",
                href: null,
             }}
          />
       </Tabs>
   );
}

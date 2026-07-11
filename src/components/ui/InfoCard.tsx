import { View } from "react-native";

export default function InfoCard({ children }: { children: React.ReactNode }) {
   return (
      <View>
         <View>{children}</View>
      </View>
   );
}

import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   ScrollView,
   Pressable,
} from "react-native";
import Animated, {
   FadeInDown,
   FadeOutUp,
   useSharedValue,
   useAnimatedStyle,
   withTiming,
} from "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps, useEffect, useState, useMemo, useCallback, memo } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterCard from "@/components/ui/FooterCard";

const tableData: TableItem[] = [
   {
      id: "1",
      icon: "walk",
      name: "Pedestres",
      priceWeekday: "R$ 0,00",
      priceWeekend: "R$ 0,00",
   },
   {
      id: "2",
      icon: "bicycle",
      name: "Bicicletas",
      priceWeekday: "R$ 0,00",
      priceWeekend: "R$ 0,00",
   },
   {
      id: "3",
      icon: "motorbike",
      name: "Motos",
      priceWeekday: "R$ 9,50",
      priceWeekend: "R$ 14,20",
   },
   {
      id: "4",
      icon: "car",
      name: "Automóveis",
      priceWeekday: "R$ 19,00",
      priceWeekend: "R$ 28,50",
   },
   // {
   //    id: "5",
   //    icon: require("@/assets/carro-com-trailer"),
   //    name: "Automóveis \ncom reboque",
   //    priceWeekday: "R$ 38,00",
   //    priceWeekend: "R$ 56,90",
   // },
];

type TableItem = {
   id: string;
   icon: IconName;
   name: string;
   priceWeekend: string;
   priceWeekday: string;
};

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export default function Info() {
   const [isExpanded, setIsExpanded] = useState(false);

   // Memoizar dados exibidos
   const displayedData = useMemo(
      () => (isExpanded ? tableData : tableData.slice(0, 4)),
      [isExpanded]
   );

   // Memoizar renderItem
   const renderItem = useCallback(
      ({ item }: { item: TableItem }) => <TariffCard item={item} />,
      []
   );

   return (
      <ScrollView
         style={{ backgroundColor: "#F8F9F9" }}
         showsVerticalScrollIndicator={false}
      >
         <View style={{ marginLeft: 20, marginRight: 20 }}>
            <View style={styles.imageContainer}>
               <ImageBackground
                  source={require("@/assets/imagemMar.png")}
                  style={styles.imageBackground}
                  imageStyle={{ borderRadius: 12 }}
                  resizeMode="contain"
               >
                  <View style={styles.textContainer}>
                     <Text style={styles.Headertext}>INFORMAÇÕES OFICIAIS</Text>
                     <Text style={styles.text}>
                        Travessia Segura e Transparente
                     </Text>
                  </View>
               </ImageBackground>
            </View>

            <View style={styles.PriceContainer}>
               <FontAwesome6
                  name="money-bills"
                  size={24}
                  color="#001E40"
                  style={{ marginTop: 4 }}
               />
               <Text style={styles.PriceText}>Tabela de Preços</Text>
            </View>

            {/* Grid de Cards */}
            <Animated.FlatList
               data={displayedData}
               keyExtractor={(item) => item.id}
               renderItem={renderItem}
               numColumns={2}
               columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
               scrollEnabled={false}
               style={{ marginBottom: 12 }}
            />

            <Text style={styles.ObservationText}>
               * Valores sujeitos a alteração conforme regulamentação vigente.
            </Text>
            <View style={styles.footerContainer}>
               <Feather name="clock" size={20} color="#001E40" />
               <Text style={styles.footerHeaderText}>Funcionamento</Text>
            </View>
            <FooterCard style={styles.footerCard} accentColor="#001E40">
               <Text style={styles.footerText}>
                  Operação 24 horas por dia, 7 dias por semana.
               </Text>
               <View style={styles.footerMiniCard}>
                  <View>
                     <View style={styles.footerMiniCardContent}>
                        <MaterialIcons
                           name="info-outline"
                           size={24}
                           color="black"
                           style={styles.footerMiniCardIcon}
                        />
                        <Text style={styles.footerMiniCardText}>
                           Saídas a cada 30 minutos em condições normais de
                           navegação e clima. E de 1 em 1h durante a madrugada.
                        </Text>
                     </View>
                  </View>
               </View>
            </FooterCard>
         </View>
      </ScrollView>
   );
}

// Memoizar TariffCard
const TariffCard = memo(function TariffCard({ item }: { item: TableItem }) {
   return (
      <Animated.View
         entering={FadeInDown.duration(300)}
         exiting={FadeOutUp.duration(200)}
         style={styles.tariffCardWrapper}
      >
         <View style={styles.tariffCard}>
            <MaterialCommunityIcons
               name={item.icon}
               size={32}
               color="#4A5568"
               style={styles.tariffIcon}
            />
            <Text style={styles.tariffName}>{item.name}</Text>
            <View style={styles.tariffPricesContainer}>
               <View style={styles.tariffPriceBox}>
                  <Text style={styles.tariffPriceLabel}>Dias Úteis</Text>
                  <Text style={styles.tariffPrice}>{item.priceWeekday}</Text>
               </View>
               <View style={styles.tariffPriceBox}>
                  <Text style={styles.tariffPriceLabel}>Fim de Semana</Text>
                  <Text style={styles.tariffPrice}>{item.priceWeekend}</Text>
               </View>
            </View>
         </View>
      </Animated.View>
   );
});

const styles = StyleSheet.create({
   imageContainer: {
      height: 128,
      width: 350,
      marginTop: 24,
      alignSelf: "center",
      marginRight: 17,
   },
   textContainer: {
      padding: 24,
   },
   imageBackground: {
      backgroundColor: "#003366",
      height: "100%",
      width: "100%",
      borderRadius: 12,
   },
   Headertext: {
      fontFamily: "Manrope_600Bold",
      color: "#fff",
      fontSize: 13,
      alignSelf: "flex-start",
      marginTop: 8,
   },
   text: {
      color: "#fff",
      fontSize: 20,
      alignSelf: "flex-start",
      marginRight: 90,
   },
   PriceContainer: {
      marginTop: 24,
      marginLeft: 2,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
   },
   priceContainer: {
      alignItems: "center",
      flexDirection: "row",
      gap: 21,
   },
   PriceText: {
      fontFamily: "Manrope_600SemiBold",
      color: "#001E40",
      fontSize: 20,
      marginLeft: 13,
   },
   card: {
      backgroundColor: "#F7F9FA",
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
   },
   headerRow: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: "#F3F4F5",
      borderBottomWidth: 1,
      borderBottomColor: "#D2D6DC",
   },
   headerText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#4A5568",
      letterSpacing: 0.5,
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 20,
   },
   categoryContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: 140,
   },
   icon: {
      marginRight: 7,
   },
   categoryText: {
      fontSize: 16,
      color: "#1A202C",
   },
   priceText: {
      fontSize: 18,
      width: 90,
      fontWeight: "bold",
      color: "#0D2B45",
   },
   separator: {
      height: 1,
      backgroundColor: "#E2E8F0",
   },
   TariffContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 25,
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: "#F3F4F5",
      borderBottomWidth: 1,
      borderBottomColor: "#D2D6DC",
   },
   TariffText: {
      fontFamily: "Manrope",
      fontSize: 12,
      fontWeight: "700",
      color: "#4A5568",
      letterSpacing: 0.5,
   },
   TariffTextWeekend: {
      textAlign: "center",
      maxWidth: 110,
      fontFamily: "Manrope",
      fontSize: 12,
      fontWeight: "700",
      color: "#4A5568",
      letterSpacing: 0.5,
   },
   listContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 12,
   },
   tariffCardWrapper: {
      flex: 0.48,
      minHeight: 180,
   },
   tariffCard: {
      flex: 1,
      backgroundColor: "#FFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#D2D6DC",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 12,
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
   },
   tariffIcon: {
      marginBottom: 12,
   },
   tariffName: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1A202C",
      textAlign: "center",
      marginBottom: 12,
      fontFamily: "Manrope_600SemiBold",
   },
   tariffPricesContainer: {
      width: "100%",
      gap: 8,
   },
   tariffPriceBox: {
      backgroundColor: "#F3F4F5",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      alignItems: "center",
   },
   tariffPriceLabel: {
      fontSize: 11,
      color: "#4A5568",
      fontWeight: "600",
      marginBottom: 4,
      fontFamily: "Manrope",
   },
   tariffPrice: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0D2B45",
      fontFamily: "Manrope_600SemiBold",
   },
   ObservationText: {
      textAlign: "center",
      fontFamily: "Manrope_500SemiBold",
      fontSize: 12,
      color: "#4A5568",
      letterSpacing: 0.5,
   },
   footerContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 8,
      marginTop: 24,
   },
   footerHeaderText: {
      fontSize: 20,
      fontFamily: "Manrope_600SemiBold",
      color: "#003366",
      fontWeight: "600",
   },
   footerCard: {
      marginTop: 16,
      width: 350,
      height: 226,
      paddingVertical: 23,
      paddingHorizontal: 24,
      backgroundColor: "#FFF",
      borderRadius: 12,
      elevation: 1,
      marginBottom: 24,
   },
   footerText: {
      fontSize: 15,
      fontFamily: "Manrope_400Regular",
      color: "#191C1D",
   },
   footerMiniCard: {
      marginTop: 16,
      width: 298,
      height: 104,
      backgroundColor: "#DBE3EA",
      borderRadius: 12,
   },
   footerMiniCardContent: {
      flexDirection: "row",
      alignItems: "baseline",
   },

   footerMiniCardIcon: {
      paddingTop: 10,
      paddingLeft: 16,
   },
   footerMiniCardText: {
      marginLeft: 10,
      marginRight: 26,
      width: 250,
      fontSize: 13.5,
      fontFamily: "Manrope_400Regular",
      color: "#191C1D",
   },
});

import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/context";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Animated, {
   FadeIn,
   FadeOut,
   useAnimatedStyle,
   withTiming,
} from "react-native-reanimated";
import Card from "@/components/ui/Card";
import Feather from "@expo/vector-icons/Feather";
import * as Linking from "expo-linking";

type FaqItem = {
   question: string;
   answer: string;
};

const FAQ_DATA: FaqItem[] = [
   {
      question: "De onde vêm as informações do aplicativo?",
      answer:
         "Todos os dados de tempo de espera e status de operação são extraídos em tempo real do sistema oficial do Departamento Hidroviário (Semil). O aplicativo atua como um facilitador, organizando essas informações públicas para você visualizar de forma mais rápida e leve no celular.",
   },
   {
      question: "Por que a câmera ao vivo às vezes fica preta ou falha?",
      answer:
         "As imagens das câmeras são transmitidas diretamente pelos servidores oficiais do governo. Se houver instabilidade na rede deles, pico de acessos ou manutenção no porto, a imagem pode ficar temporariamente indisponível aqui.",
   },
   {
      question: "Com que frequência os tempos de espera são atualizados?",
      answer:
         "O nosso sistema verifica o site oficial a cada 1 minuto para garantir que você esteja sempre vendo a informação mais recente disponível, economizando a bateria e a franquia de dados do seu celular.",
   },
];

export default function AboutScreen() {
   const { colors } = useTheme();
   return (
      <ScrollView
         style={[
            { flex: 1, paddingHorizontal: 20 },
            { backgroundColor: colors.background },
         ]}
      >
         <Text style={[{ color: colors.text }, styles.header]}>
            Perguntas Frequentes
         </Text>
         <View style={[{ marginTop: 16 }, styles.questionContainer]}>
            {FAQ_DATA.map((item) => (
               <FaqCard key={item.question} item={item} />
            ))}
         </View>
         <View style={[styles.box, { backgroundColor: colors.primary }]}>
            <Text style={[styles.boxText, { color: colors.textOnPrimary }]}>
               Encontrou um erro ou tem uma sugestão?
            </Text>
            <Text
               style={[
                  styles.subText,
                  { color: colors.textOnPrimary, opacity: 0.75 },
               ]}
            >
               A sua opinião é importante para melhorarmos a ferramenta.
            </Text>
            <Pressable
               style={({ pressed }) => [
                  styles.buttonContainer,
                  {
                     backgroundColor: colors.surface,
                     opacity: pressed ? 0.8 : 1,
                  },
               ]}
               onPress={() => Linking.openURL("mailto:gavarron.dev@gmail.com")}
            >
               <Feather
                  name="mail"
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
               />
               <Text style={[styles.buttonText, { color: colors.primary }]}>
                  Enviar E-mail para o{"\n"} Suporte
               </Text>
            </Pressable>
         </View>
      </ScrollView>
   );
}

function FaqCard({ item }: { item: FaqItem }) {
   const { colors } = useTheme();
   const [expanded, setExpanded] = useState(false);

   const chevronStyle = useAnimatedStyle(() => ({
      transform: [
         {
            rotate: withTiming(expanded ? "180deg" : "0deg", { duration: 200 }),
         },
      ],
   }));

   return (
      <Card style={styles.faqCard}>
         <Pressable
            style={styles.faqHeader}
            onPress={() => setExpanded((prev) => !prev)}
         >
            <Text style={[styles.question, { color: colors.text }]}>
               {item.question}
            </Text>
            <Animated.View style={chevronStyle}>
               <Feather
                  name="chevron-down"
                  size={22}
                  color={colors.textSecondary}
               />
            </Animated.View>
         </Pressable>
         {expanded && (
            <Animated.View
               entering={FadeIn.duration(150)}
               exiting={FadeOut.duration(150)}
            >
               <Text style={[styles.answer, { color: colors.textSecondary }]}>
                  {item.answer}
               </Text>
            </Animated.View>
         )}
      </Card>
   );
}

const styles = StyleSheet.create({
   header: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 20,
      marginTop: 20,
   },
   questionContainer: {
      gap: 16,
   },
   faqCard: {
      paddingVertical: 12,
   },
   faqHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
   },
   question: {
      flex: 1,
      fontSize: 18,
      fontFamily: "Manrope_500SemiBold",
   },
   answer: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      fontFamily: "Manrope_400Regular",
   },
   box: {
      marginTop: 24,
      padding: 32,
      height: 292,
      borderRadius: 12,
   },
   boxText: {
      // textAlign: "center",
      fontSize: 24,
      fontFamily: "Manrope_700Bold",
   },
   subText: {
      // textAlign: "center",
      fontSize: 16,
      fontFamily: "Manrope_400Regular",
   },
   buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      height: 88,
      borderRadius: 12,
      // width: 266,
      // alignSelf: "center",
   },
   buttonText: {
      marginLeft: 20,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "Manrope_600SemiBold",
   },
   icon: {
      marginLeft: 24,
   },
});

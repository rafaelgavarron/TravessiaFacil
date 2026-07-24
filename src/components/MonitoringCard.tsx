import React, { useState, useCallback, memo } from "react";
import {
   View,
   Text,
   StyleSheet,
   Pressable,
   ImageBackground,
} from "react-native";
import type { Camera } from "@/types/camera";
import { useTheme } from "@/context";

interface MonitoringCardProps {
   titulo: string;
   listaCameras: Camera[];
}

function CardMonitoramentoContent({
   titulo,
   listaCameras,
}: MonitoringCardProps) {
   const { colors } = useTheme();
   // Guarda o índice da câmera selecionada (começa na primeira)
   const [cameraAtiva, setCameraAtiva] = useState(0);

   // Obtém os dados da câmera que está ativa no momento
   const cameraAtual = listaCameras[cameraAtiva];

   // Memoizar callback para evitar re-renders dos Pressable filhos
   const handleCameraPress = useCallback((index: number) => {
      setCameraAtiva(index);
   }, []);

   return (
      <View style={[styles.cardContainer, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
         <Text style={[styles.titulo, { color: colors.text }]}>{titulo}</Text>

         {/* Container do Vídeo / Transmissão */}
         <ImageBackground
            source={{ uri: cameraAtual?.imageUrl || "https://placeholder.com" }}
            style={[styles.videoContainer, { backgroundColor: colors.surfaceVariant }]}
            imageStyle={{ borderRadius: 12 }}
         ></ImageBackground>

         {/* Renderização Dinâmica das Câmeras */}
         <View style={styles.containerBotoes}>
            {listaCameras.map((camera, index) => {
               const isActive = cameraAtiva === index;
               return (
                  <CameraButton
                     key={index}
                     isActive={isActive}
                     nome={camera.nome}
                     index={index}
                     onPress={handleCameraPress}
                  />
               );
            })}
         </View>
      </View>
   );
}

// Componente memoizado para botão de câmera
const CameraButton = memo(function CameraButton({
   isActive,
   nome,
   index,
   onPress,
}: {
   isActive: boolean;
   nome: string;
   index: number;
   onPress: (index: number) => void;
}) {
   const { colors } = useTheme();
   const handlePress = useCallback(() => {
      onPress(index);
   }, [index, onPress]);

   return (
      <Pressable
         onPress={handlePress}
         style={({ pressed }) => [
            styles.botaoCamera,
            isActive
               ? [styles.botaoAtivo, { backgroundColor: colors.primary, borderColor: colors.primary }]
               : [styles.botaoInativo, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }],
            { opacity: pressed ? 0.8 : 1 },
         ]}
      >
         <Text
            style={[
               styles.textoBotao,
               isActive ? [styles.textoAtivo, { color: colors.textOnPrimary }] : [styles.textoInativo, { color: colors.textSecondary }],
            ]}
         >
            {nome}
         </Text>
      </Pressable>
   );
});

export default memo(CardMonitoramentoContent);

const styles = StyleSheet.create({
   cardContainer: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // elevation: 1, // Sombra para Android
   },
   titulo: {
      fontFamily: "Manrope",
      fontSize: 20,
      fontWeight: "semibold",
      marginBottom: 12,
   },
   videoContainer: {
      width: "100%",
      aspectRatio: 16 / 9,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
   },
   badgeLive: {
      position: "absolute",
      top: 12,
      left: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
   },
   textoLive: {
      fontSize: 10,
      fontWeight: "bold",
   },
   botaoPlay: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      justifyContent: "center",
      alignItems: "center",
   },
   iconePlay: {
      fontSize: 16,
      marginLeft: 2,
   },
   containerBotoes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
   },
   botaoCamera: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
   },
   botaoAtivo: {},
   botaoInativo: {},
   textoBotao: {
      fontSize: 13,
      fontWeight: "500",
   },
   textoAtivo: {},
   textoInativo: {},
});

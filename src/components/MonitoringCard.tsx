import React, { useState, useCallback, memo } from "react";
import {
   View,
   Text,
   StyleSheet,
   Pressable,
   ImageBackground,
} from "react-native";

// 1. O Componente Reaproveitável
function CardMonitoramentoContent({ titulo, listaCameras }: any) {
   // Guarda o índice da câmera selecionada (começa na primeira)
   const [cameraAtiva, setCameraAtiva] = useState(0);

   // Obtém os dados da câmera que está ativa no momento
   const cameraAtual = listaCameras[cameraAtiva];

   // Memoizar callback para evitar re-renders dos Pressable filhos
   const handleCameraPress = useCallback((index: number) => {
      setCameraAtiva(index);
   }, []);

   return (
      <View style={styles.cardContainer}>
         <Text style={styles.titulo}>{titulo}</Text>

         {/* Container do Vídeo / Transmissão */}
         <ImageBackground
            source={{ uri: cameraAtual?.videoUrl || "https://placeholder.com" }}
            style={styles.videoContainer}
            imageStyle={{ borderRadius: 12 }}
         >
            {/*<View style={styles.badgeLive}>
               <Text style={styles.textoLive}>LIVE</Text>
            </View>*/}

            <Pressable
               style={({ pressed }) => [
                  styles.botaoPlay,
                  { opacity: pressed ? 0.7 : 1 },
               ]}
            >
               <Text style={styles.iconePlay}>▶</Text>
            </Pressable>
         </ImageBackground>

         {/* Renderização Dinâmica das Câmeras */}
         <View style={styles.containerBotoes}>
            {listaCameras.map((camera: any, index: number) => {
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
   const handlePress = useCallback(() => {
      onPress(index);
   }, [index, onPress]);

   return (
      <Pressable
         onPress={handlePress}
         style={({ pressed }) => [
            styles.botaoCamera,
            isActive ? styles.botaoAtivo : styles.botaoInativo,
            { opacity: pressed ? 0.8 : 1 },
         ]}
      >
         <Text
            style={[
               styles.textoBotao,
               isActive ? styles.textoAtivo : styles.textoInativo,
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
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // elevation: 1, // Sombra para Android
   },
   titulo: {
      fontFamily: "Manrope",
      fontSize: 20,
      fontWeight: "semibold",
      color: "#191C1D",
      marginBottom: 12,
   },
   videoContainer: {
      width: "100%",
      aspectRatio: 16 / 9,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e1e1e1",
      marginBottom: 12,
   },
   badgeLive: {
      position: "absolute",
      top: 12,
      left: 12,
      backgroundColor: "#1e293b",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
   },
   textoLive: {
      color: "#fff",
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
      color: "#fff",
      fontSize: 16,
      marginLeft: 2, // Ajuste óptico do ícone de play
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
   botaoAtivo: {
      backgroundColor: "#2e445e",
      borderColor: "#2e445e",
   },
   botaoInativo: {
      backgroundColor: "#f1f5f9",
      borderColor: "#e2e8f0",
   },
   textoBotao: {
      fontSize: 13,
      fontWeight: "500",
   },
   textoAtivo: {
      color: "#fff",
   },
   textoInativo: {
      color: "#475569",
   },
});

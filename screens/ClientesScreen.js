import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ClientesScreen() {
  return (
    <View style={styles.container}>

      {/* GIF de construção exibido no topo da tela */}
      <Image
        source={require("../assets/construindo.gif")}
        style={styles.gif}
      />

      {/* Título principal da tela */}
      <Text style={styles.titulo}>
        Clientes
      </Text>

      {/* Card com as informações sobre a funcionalidade */}
      <View style={styles.card}>

        <Text style={styles.texto}>
          Área destinada ao cadastro e gerenciamento de clientes.
        </Text>

        <Text style={styles.info}>
          Em desenvolvimento...
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  // Container principal da tela
  container: {
    flex: 1, // Ocupa toda a tela
    alignItems: "center", // Centraliza os elementos horizontalmente
    backgroundColor: "#0f172a", // Fundo escuro da identidade Pixel Geek
    padding: 20, // Espaçamento interno da tela
    paddingTop: 10, // Distância do topo da tela
  },

  // Estilo do GIF de construção
  gif: {
    width: 240, // Largura do GIF
    height: 320, // Altura do GIF
    resizeMode: "contain", // Mantém a proporção do GIF
    marginBottom: -10, // Aproxima o título do GIF
  },

  // Estilo do título "Clientes"
  titulo: {
    fontSize: 30, // Tamanho maior para destacar o título
    fontWeight: "bold", // Deixa o texto em negrito
    color: "#facc15", // Dourado da identidade visual Pixel Geek
    marginBottom: 20, // Espaço abaixo do título
  },

  // Cartão com informações sobre a tela
  card: {
    width: "100%", // Ocupa toda a largura disponível
    backgroundColor: "#1e293b", // Fundo do card em azul escuro
    padding: 25, // Espaçamento interno do conteúdo
    borderRadius: 15, // Deixa os cantos arredondados
    borderWidth: 1, // Cria uma borda ao redor do card
    borderColor: "#7c3aed", // Roxo neon da identidade Pixel Geek
    alignItems: "center", // Centraliza os textos dentro do card
  },

  // Texto principal de descrição
  texto: {
    color: "#f8fafc", // Texto branco para facilitar a leitura
    fontSize: 18, // Tamanho confortável para leitura
    textAlign: "center", // Centraliza o texto
    marginBottom: 15, // Espaço antes da próxima informação
  },

  // Texto indicando que a função ainda está sendo criada
  info: {
    color: "#facc15", // Dourado para destacar o status da tela
    fontSize: 16, // Tamanho menor que o texto principal
    fontStyle: "italic", // Deixa o texto em itálico
  },

});
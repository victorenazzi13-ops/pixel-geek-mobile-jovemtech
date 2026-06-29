import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { getDatabase } from '../database';

// Importa o logo direto da sua pasta assets
import logoImg from '../assets/logo.png'; 

export default function HomeScreen({ navigation }) {
  const db = getDatabase();

  const [totalClientes, setTotalClientes] = useState(0);
  const [totalCurriculos, setTotalCurriculos] = useState(0);

  useEffect(() => {
    carregarMetricas();
  }, []);

  function carregarMetricas() {
    try {
      const clientes = db.getAllSync('SELECT id FROM clientes');
      const curriculos = db.getAllSync('SELECT id FROM curriculos');
      
      setTotalClientes(clientes.length);
      setTotalCurriculos(curriculos.length);
    } catch (error) {
      console.log('Erro ao carregar métricas da Home:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Cabeçalho de Boas-Vindas com o Logo Ampliado */}
        <View style={styles.header}>
          <View style={styles.headerTextoArea}>
            <Text style={styles.saudacao}>Olá, Admin 👋</Text>
            <Text style={styles.subSaudacao}>Painel de Controle Pixel Geek</Text>
          </View>
          <Image source={logoImg} style={styles.logo} />
        </View>

        {/* Status do Sistema Fictício */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIndicador} />
          <Text style={styles.statusTexto}>Site Oficial: 100% Operacional</Text>
          <TouchableOpacity onPress={carregarMetricas} style={styles.botaoAtualizar}>
            <Text style={styles.textoAtualizar}>🔄 Atualizar dados</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Métricas (Dashboard) */}
        <Text style={styles.secaoTitulo}>Visão Geral do Site</Text>
        <View style={styles.dashboardGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>👥</Text>
            <Text style={styles.metricNumero}>{totalClientes}</Text>
            <Text style={styles.metricLabel}>Clientes Cadastrados</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>📄</Text>
            <Text style={styles.metricNumero}>{totalCurriculos}</Text>
            <Text style={styles.metricLabel}>Currículos na Fila</Text>
          </View>
        </View>

        {/* Barra de Progresso de Metas */}
        <Text style={styles.secaoTitulo}>Metas de Lançamento</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaLinha}>
            <Text style={styles.metaTexto}>Meta de Clientes ({totalClientes}/50)</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barraProgresso, { width: `${Math.min((totalClientes / 50) * 100, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.metaLinha}>
            <Text style={styles.metaTexto}>Banco de Talentos ({totalCurriculos}/20)</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barraProgresso, { width: `${Math.min((totalCurriculos / 20) * 100, 100)}%`, backgroundColor: '#facc15' }]} />
            </View>
          </View>
        </View>

        {/* Ações de Gerenciamento (Navegação) */}
        <Text style={styles.secaoTitulo}>Gerenciamento</Text>
        
        {/* Botão de Controle de Clientes */}
        <TouchableOpacity 
          style={styles.botaoAcao}
          onPress={() => navigation.navigate('Clientes')} 
        >
          <View style={styles.botaoConteudo}>
            <Text style={styles.botaoIcone}>👤</Text>
            <View style={styles.textosBotaoArea}>
              <Text style={styles.botaoTitulo}>Controle de Clientes</Text>
              <Text style={styles.botaoDescricao}>Visualizar, editar e remover usuários</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Botão de Banco de Currículos */}
        <TouchableOpacity 
          style={styles.botaoAcao}
          onPress={() => navigation.navigate('Curriculos')} 
        >
          <View style={styles.botaoConteudo}>
            <Text style={styles.botaoIcone}>💼</Text>
            <View style={styles.textosBotaoArea}>
              <Text style={styles.botaoTitulo}>Banco de Currículos</Text>
              <Text style={styles.botaoDescricao}>Triagem de candidatos e arquivos PDF</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Log de Avisos Fictício */}
        <View style={styles.notificacaoBox}>
          <Text style={styles.notificacaoTitulo}>🔔 Último Alerta do Sistema</Text>
          <Text style={styles.notificacaoTexto}>
            Banco de dados local sincronizado com sucesso. Nenhuma inconsistência encontrada no app Expo Go.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
    gap: 15,
  },
  headerTextoArea: {
    flex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: '#1e293b',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#facc15',
  },
  saudacao: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subSaudacao: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  statusIndicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  statusTexto: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 12,
    flex: 1,
    marginLeft: 10,
  },
  botaoAtualizar: {
    backgroundColor: '#0f172a',
    padding: 6,
    borderRadius: 5,
  },
  textoAtualizar: {
    color: '#facc15',
    fontSize: 11,
    fontWeight: 'bold',
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#facc15',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  dashboardGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed',
    alignItems: 'center',
  },
  metricEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  metricNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  metricLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
    textAlign: 'center',
  },
  metaContainer: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed',
    gap: 12,
  },
  metaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaTexto: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  barraFundo: {
    width: 120,
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barraProgresso: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 4,
  },
  botaoAcao: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  botaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  botaoIcone: {
    fontSize: 26,
  },
  textosBotaoArea: {
    flex: 1,
  },
  botaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  botaoDescricao: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
  },
  notificacaoBox: {
    backgroundColor: '#1e293b',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#facc15',
  },
  notificacaoTitulo: {
    color: '#facc15',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  notificacaoTexto: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 16,
  }
});
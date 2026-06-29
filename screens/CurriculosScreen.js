import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { getDatabase } from '../database';

export default function CurriculosScreen() {
  const db = getDatabase();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [arquivo, setArquivo] = useState('');
  const [nomeArquivo, setNomeArquivo] = useState(''); // Estado para armazenar o nome real do PDF
  const [curriculos, setCurriculos] = useState([]);

  useEffect(() => {
    carregarCurriculos();
  }, []);

  function carregarCurriculos() {
    try {
      const resultado = db.getAllSync(
        'SELECT * FROM curriculos ORDER BY id DESC'
      );
      setCurriculos(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  async function selecionarPDF() {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (resultado.canceled) return;

      setArquivo(resultado.assets[0].uri);
      setNomeArquivo(resultado.assets[0].name); // Captura o nome real do arquivo (ex: curriculo.pdf)
    } catch (error) {
      console.log(error);
    }
  }

  function limparFormulario() {
    setNome('');
    setEmail('');
    setArquivo('');
    setNomeArquivo('');
  }

  function salvarCurriculo() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do candidato.');
      return;
    }

    // Validação padrão de e-mail com formato Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      Alert.alert('Atenção', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!arquivo) {
      Alert.alert('Atenção', 'Selecione um PDF.');
      return;
    }

    try {
      // Salvamos o nome do arquivo no campo 'arquivo' para exibição na lista
      db.runSync(
        `
        INSERT INTO curriculos
        (nome, email, arquivo)
        VALUES (?, ?, ?)
        `,
        [nome, email, nomeArquivo]
      );

      Alert.alert('Sucesso', 'Currículo cadastrado.');
      limparFormulario();
      carregarCurriculos();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  }

  function excluirCurriculo(id) {
    Alert.alert(
      'Excluir',
      'Deseja excluir este currículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            try {
              db.runSync(
                'DELETE FROM curriculos WHERE id = ?',
                [id]
              );
              carregarCurriculos();
              Alert.alert('Sucesso', 'Currículo removido.');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  }

  function renderCurriculo({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.nome}>👤 {item.nome}</Text>
        <Text style={styles.info}>📧 {item.email || 'Não informado'}</Text>
        {/* Exibe o nome real do PDF salvo no banco de dados */}
        <Text style={styles.arquivo} numberOfLines={1}>📄 {item.arquivo}</Text>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => excluirCurriculo(item.id)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Currículos</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome do candidato"
          placeholderTextColor="#cbd5e1"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#cbd5e1"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.botaoPDF} onPress={selecionarPDF}>
          <Text style={styles.textoBotao}>Selecionar PDF</Text>
        </TouchableOpacity>

        {nomeArquivo ? (
          <Text style={styles.pdfSelecionado}>📎 {nomeArquivo}</Text>
        ) : null}

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCurriculo}>
          <Text style={styles.textoBotao}>Salvar Currículo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Currículos Recebidos</Text>

      <FlatList
        data={curriculos}
        renderItem={renderCurriculo}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.listaVaziaTexto}>🔍 Nenhum currículo na fila de triagem...</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#facc15',
    textAlign: 'center',
    marginTop: 20,
  },
  formulario: {
    backgroundColor: '#1e293b',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  input: {
    borderWidth: 1,
    borderColor: '#facc15',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#0f172a',
    color: '#f8fafc',
  },
  botaoPDF: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: '#dab10e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  pdfSelecionado: {
    color: '#facc15',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 13,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#facc15',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  info: {
    marginTop: 5,
    color: '#cbd5e1',
  },
  arquivo: {
    marginTop: 5,
    color: '#facc15',
    fontWeight: '500',
  },
  botaoExcluir: {
    backgroundColor: '#dab10e',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  listaVaziaTexto: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 16,
    fontStyle: 'italic'
  },
});
// IMPORTA React - a biblioteca principal
import React, { useState, useEffect } from 'react';

// IMPORTA componentes de interface do React Native
import {
  View,           // Caixa genérica para conteúdo
  Text,           // Para mostrar texto
  TextInput,      // Campo para digitar
  TouchableOpacity, // Botão
  FlatList,       // Lista eficiente que rola
  Alert,          // Caixa de diálogo
  StyleSheet,     // Para estilos (cores, tamanhos)
  ScrollView,     // Permite rolar conteúdo grande
} from 'react-native';

// IMPORTA a ferramenta para escolher documentos (PDFs)
import * as DocumentPicker from 'expo-document-picker';

// IMPORTA a função que traz o banco de dados
import { getDatabase } from '../database';

// COMPONENTE TELA DE CURRÍCULOS - gerencia cadastro de currículos
export default function CurriculosScreen() {
  // PEGA o banco de dados
  const db = getDatabase();

  // ESTADOS - variáveis que podem mudar e atualizam a tela
  // nome: nome do candidato digitado no input
  const [nome, setNome] = useState('');
  // email: email do candidato digitado no input
  const [email, setEmail] = useState('');
  // arquivo: caminho do arquivo PDF selecionado
  const [arquivo, setArquivo] = useState('');

  // curriculos: lista de TODOS os currículos salvos no banco
  const [curriculos, setCurriculos] = useState([]);

  // useEffect: executa quando o componente abre
  useEffect(() => {
    // CARREGA todos os currículos do banco quando a tela abre
    carregarCurriculos();
  }, []); // [] significa: execute uma vez só

  // FUNÇÃO: carrega todos os currículos do banco de dados
  function carregarCurriculos() {
    try {
      // SELECT: comando para pegar dados
      // * : todos os campos
      // FROM curriculos: da tabela "curriculos"
      // ORDER BY id DESC: ordena por id de forma reversa (maior pra menor)
      const resultado = db.getAllSync(
        'SELECT * FROM curriculos ORDER BY id DESC'
      );

      // ATUALIZA o estado curriculos com a lista do banco
      setCurriculos(resultado);
    } catch (error) {
      // SE der erro, mostra no console
      console.log(error);
    }
  }

  // FUNÇÃO: abre o seletor de documentos para escolher um PDF
  async function selecionarPDF() {
    // async: significa que essa função vai levar tempo (operação assíncrona)
    try {
      // DocumentPicker.getDocumentAsync: abre o seletor de arquivos do celular
      const resultado =
        await DocumentPicker.getDocumentAsync({
          type: 'application/pdf', // Só permite PDFs
          copyToCacheDirectory: true, // Copia para pasta temporária
        });
      // await: significa "aguarde até o usuário escolher um arquivo"

      // SE o usuário cancelou, não faz nada
      if (resultado.canceled) return;

      // PEGA o caminho do arquivo selecionado e guarda no estado
      // resultado.assets[0].uri: o primeiro arquivo selecionado, seu caminho
      setArquivo(resultado.assets[0].uri);
    } catch (error) {
      // SE der erro, mostra no console
      console.log(error);
    }
  }

  // FUNÇÃO: limpa o formulário (apaga tudo)
  function limparFormulario() {
    setNome('');      // Limpa nome
    setEmail('');     // Limpa email
    setArquivo('');   // Limpa arquivo
  }

  // FUNÇÃO: salva um novo currículo no banco de dados
  function salvarCurriculo() {
    // VALIDA: se o nome está vazio, mostra alerta
    if (!nome.trim()) {
      // trim(): remove espaços do início e fim
      // !: significa "não"
      Alert.alert(
        'Atenção',
        'Informe o nome do candidato.'
      );
      return; // PARA aqui
    }

    // VALIDA: se nenhum PDF foi selecionado, mostra alerta
    if (!arquivo) {
      Alert.alert(
        'Atenção',
        'Selecione um PDF.'
      );
      return; // PARA aqui
    }

    try {
      // INSERT INTO: comando para adicionar dados
      // curriculos: qual tabela
      // (nome, email, arquivo): quais campos
      // VALUES (?, ?, ?): valores (? protege de hackers)
      db.runSync(
        `
        INSERT INTO curriculos
        (nome, email, arquivo)
        VALUES (?, ?, ?)
        `,
        [nome, email, arquivo] // SUBSTITUI os ? por esses valores
      );

      // MOSTRA mensagem de sucesso
      Alert.alert(
        'Sucesso',
        'Currículo cadastrado.'
      );

      // LIMPA o formulário
      limparFormulario();
      
      // RECARREGA a lista de currículos para mostrar o novo
      carregarCurriculos();
    } catch (error) {
      // SE der erro, mostra no console
      console.log(error);

      // E mostra mensagem de erro ao usuário
      Alert.alert(
        'Erro',
        'Não foi possível salvar.'
      );
    }
  }

  // FUNÇÃO: deleta um currículo do banco de dados
  function excluirCurriculo(id) {
    // MOSTRA uma caixa de diálogo perguntando confirmação
    Alert.alert(
      'Excluir',
      'Deseja excluir este currículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel', // Botão normal
          // Se clicar, não faz nada
        },
        {
          text: 'Excluir',
          style: 'destructive', // Botão de alerta (vermelho)
          // SE clicar em Excluir, executa essa função
          onPress: () => {
            try {
              // DELETE: comando para remover dados
              // FROM curriculos: da tabela curriculos
              // WHERE id = ?: qual currículo (pelo ID)
              db.runSync(
                'DELETE FROM curriculos WHERE id = ?',
                [id] // ID do currículo a deletar
              );

              // RECARREGA a lista (agora sem o currículo deletado)
              carregarCurriculos();

              // MOSTRA mensagem de sucesso
              Alert.alert(
                'Sucesso',
                'Currículo removido.'
              );
            } catch (error) {
              // SE der erro, mostra no console
              console.log(error);
            }
          },
        },
      ]
    );
  }

  // FUNÇÃO: renderiza (desenha) CADA currículo como um card na tela
  function renderCurriculo({ item }) {
    // item: é um currículo da lista
    return (
      // View: caixa que contém tudo do currículo
      <View style={styles.card}>
        {/* NOME DO CANDIDATO */}
        <Text style={styles.nome}>
          {item.nome}
        </Text>

        {/* EMAIL DO CANDIDATO */}
        <Text style={styles.info}>
          📧 {item.email}
        </Text>

        {/* INDICADOR DE PDF (mostra que tem um arquivo) */}
        <Text
          style={styles.arquivo}
          numberOfLines={2} // Máximo 2 linhas
        >
          📄 PDF anexado
        </Text>

        {/* BOTÃO EXCLUIR */}
        <TouchableOpacity
          style={styles.botaoExcluir}
          // Quando toca, executa a função de excluir com o ID
          onPress={() =>
            excluirCurriculo(item.id)
          }
        >
          <Text style={styles.textoBotao}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // RETORNA o que mostrar na tela
  return (
    // ScrollView: permite rolar se tiver muito conteúdo
    <ScrollView style={styles.container}>
      {/* TÍTULO DA PÁGINA */}
      <Text style={styles.titulo}>
        Cadastro de Currículos
      </Text>

      {/* FORMULÁRIO - onde o usuário digita os dados */}
      <View style={styles.formulario}>
        {/* INPUT NOME */}
        <TextInput
          style={styles.input}
          placeholder="Nome do candidato" // Texto que aparece quando vazio
          placeholderTextColor="#f8fafc" // Define a cor do texto de exemplo (placeholder)          
          value={nome}        // Qual estado conectado
          onChangeText={setNome} // Quando digita, atualiza o estado
        />

        {/* INPUT EMAIL */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#f8fafc" // Define a cor do texto de exemplo (placeholder)
          value={email}
          onChangeText={setEmail}
        />

        {/* BOTÃO SELECIONAR PDF */}
        <TouchableOpacity
          style={styles.botaoPDF}
          onPress={selecionarPDF} // Quando toca, abre o seletor de arquivos
        >
          <Text style={styles.textoBotao}>
            Selecionar PDF
          </Text>
        </TouchableOpacity>

        {/* MOSTRA MENSAGEM SE PDF FOI SELECIONADO */}
        {arquivo ? (
          // SE arquivo não está vazio, mostra essa mensagem
          <Text style={styles.pdfSelecionado}>
            PDF selecionado ✓
          </Text>
        ) : null}
        {/* ELSE: não mostra nada */}

        {/* BOTÃO SALVAR CURRÍCULO */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvarCurriculo} // Quando toca, salva no banco
        >
          <Text style={styles.textoBotao}>
            Salvar Currículo
          </Text>
        </TouchableOpacity>
      </View>

      {/* SUBTÍTULO - da lista de currículos */}
      <Text style={styles.subtitulo}>
        Currículos Recebidos
      </Text>

      {/* LISTA DE CURRÍCULOS */}
      <FlatList
        data={curriculos}       // Dados a mostrar (array de currículos)
        renderItem={renderCurriculo} // Como desenhar cada item
        keyExtractor={(item) =>
          item.id.toString()  // Qual propriedade é única (id convertido para texto)
        }
        scrollEnabled={false}  // Não permite scroll dentro da lista (ScrollView externo faz isso)
      />
    </ScrollView>
  );
}

// ESTILOS - cores, tamanhos, fonts, espaçamentos de tudo
const styles = StyleSheet.create({
  // Estilo do container principal (fundo da tela)
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#0f172a', // Azul escuro da identidade Pixel Geek
  },

  // Estilo do título principal da tela
  titulo: {
    fontSize: 28, // Texto grande
    fontWeight: 'bold', // Deixa em negrito
    color: '#facc15', // Dourado da marca Pixel Geek
    textAlign: 'center', // Centraliza o texto
    marginTop: 20, // Espaço na parte superior
  },

  // Estilo da caixa que contém o formulário
  formulario: {
    backgroundColor: '#1e293b', // Azul escuro para criar contraste com o fundo
    margin: 20, // Espaço externo em todos os lados
    padding: 20, // Espaçamento interno dos elementos
    borderRadius: 15, // Arredonda as bordas da caixa
    borderWidth: 1, // Cria uma borda ao redor
    borderColor: '#7c3aed', // Roxo neon da identidade Pixel Geek
  },

  // Estilo dos campos onde o usuário digita nome e e-mail
  input: {
    borderWidth: 1, // Espessura da borda
    borderColor: '#facc15', // Azul neon nas bordas dos campos
    borderRadius: 10, // Deixa as bordas arredondadas
    padding: 12, // Espaço interno para o texto não ficar colado na borda
    marginBottom: 12, // Espaço entre os campos
    backgroundColor: '#0f172a', // Fundo escuro do campo
    color: '#f8fafc', // Texto branco para melhor leitura
  },

  // Estilo do botão para selecionar o arquivo PDF
  botaoPDF: {
    backgroundColor: '#7c3aed', // Roxo neon do Pixel Geek
    padding: 15, // Tamanho interno do botão
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto do botão
    marginBottom: 12, // Espaço abaixo do botão
  },

  // Estilo do botão que salva o currículo no banco de dados
  botaoSalvar: {
    backgroundColor: '#dab10e', // Azul de destaque da identidade visual
    padding: 15, // Espaço interno do botão
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto dentro do botão
  },

  // Estilo do texto que aparece dentro dos botões
  textoBotao: {
    color: '#f8fafc', // Branco para dar contraste
    fontWeight: 'bold', // Texto em negrito
  },

  // Estilo da mensagem que mostra o PDF selecionado
  pdfSelecionado: {
    color: '#facc15', // Dourado para destacar o arquivo escolhido
    fontWeight: 'bold', // Deixa o texto destacado
    marginBottom: 12, // Espaço abaixo da mensagem
    textAlign: 'center', // Centraliza a mensagem
  },

  // Estilo do título da lista de currículos cadastrados
  subtitulo: {
    fontSize: 22, // Texto grande
    fontWeight: 'bold', // Deixa o subtítulo em negrito
    color: '#facc15', // Mantém a cor dourada da marca
    marginHorizontal: 20, // Espaço nas laterais
    marginBottom: 10, // Espaço antes da lista
  },

  // Estilo do card que exibe cada currículo salvo
  card: {
    backgroundColor: '#1e293b', // Fundo escuro do card
    marginHorizontal: 20, // Espaço nas laterais da tela
    marginBottom: 15, // Distância entre os cartões
    padding: 15, // Espaçamento interno das informações
    borderRadius: 15, // Bordas arredondadas
    borderWidth: 1, // Cria uma borda no cartão
    borderColor: '#7c3aed', // Roxo de destaque do Pixel Geek
  },

  // Estilo do nome do candidato mostrado no card
  nome: {
    fontSize: 18, // Tamanho maior para destacar o nome
    fontWeight: 'bold', // Nome em negrito
    color: '#f8fafc', // Branco para maior contraste
  },

  // Estilo das informações secundárias, como o e-mail
  info: {
    marginTop: 5, // Espaço acima do texto
    color: '#cbd5e1', // Cinza claro para informações secundárias
  },

  // Estilo da informação que indica que existe um PDF anexado
  arquivo: {
    marginTop: 5, // Espaço acima do texto
    color: '#facc15', // Dourado para chamar atenção para o currículo
  },

  // Estilo do botão de excluir o currículo
  botaoExcluir: {
    backgroundColor: '#dab10e', // Vermelho para indicar ação de remoção
    marginTop: 10, // Distância do conteúdo acima
    padding: 12, // Tamanho interno do botão
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto do botão
  },
});
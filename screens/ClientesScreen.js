import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import { getDatabase } from "../database";

export default function ClientesScreen() {
  const db = getDatabase();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");

  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    try {
      const resultado = db.getAllSync(
        "SELECT * FROM clientes ORDER BY id DESC",
      );

      setClientes(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setTelefone("");
    setClienteEditando(null);
  }

  function formatarTelefone(valor) {
    let numero = valor.replace(/\D/g, "");

    if (numero.length > 11) {
      numero = numero.slice(0, 11);
    }

    if (numero.length <= 2) {
      return numero;
    }

    if (numero.length <= 7) {
      return `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    }

    return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
  }

  function salvarCliente() {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      Alert.alert("Atenção", "Preencha nome, e-mail e telefone.");
      return;
    }

    // Validação padrão de e-mail com formato Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Atenção", "Por favor, insira um e-mail válido.");
      return;
    }

    try {
      if (clienteEditando) {
        db.runSync(
          `
          UPDATE clientes
          SET nome = ?, email = ?, telefone = ?
          WHERE id = ?
          `,
          [nome, email, telefone, clienteEditando.id],
        );

        Alert.alert("Sucesso", "Cliente atualizado com sucesso.");
      } else {
        db.runSync(
          `
          INSERT INTO clientes
          (nome, email, telefone)
          VALUES (?, ?, ?)
          `,
          [nome, email, telefone],
        );

        Alert.alert("Sucesso", `Cliente ${nome} cadastrado.`);
      }

      limparFormulario();
      carregarClientes();
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  function editarCliente(cliente) {
    setClienteEditando(cliente);

    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
  }

  function excluirCliente(id) {
    Alert.alert("Excluir", "Deseja realmente excluir este cliente?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          try {
            db.runSync("DELETE FROM clientes WHERE id = ?", [id]);

            carregarClientes();

            Alert.alert("Sucesso", "Cliente removido.");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    const textoBusca = busca.toLowerCase();

    return (
      cliente.nome.toLowerCase().includes(textoBusca) ||
      cliente.email.toLowerCase().includes(textoBusca) ||
      cliente.telefone.includes(textoBusca)
    );
  });

  function renderCliente({ item }) {
    // Identifica se este card específico está sendo editado pelo Admin
    const estaEditando = clienteEditando && clienteEditando.id === item.id;

    return (
      <View style={[
        styles.card, 
        estaEditando && { borderColor: "#facc15", backgroundColor: "#1e294b" }
      ]}>
        <Text style={styles.nome}>
          👤 {item.nome} {estaEditando && <Text style={{ color: "#facc15", fontSize: 12 }}> (Editando...)</Text>}
        </Text>

        <Text style={styles.info}>📧 {item.email}</Text>

        <Text style={styles.info}>📞 {item.telefone}</Text>

        <View style={styles.areaBotoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => editarCliente(item)}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => excluirCliente(item.id)}
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Clientes Pixel Geek</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
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

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#cbd5e1"
          value={telefone}
          onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCliente}>
          <Text style={styles.textoBotao}>
            {clienteEditando ? "Atualizar Cliente" : "Salvar Cliente"}
          </Text>
        </TouchableOpacity>

        {clienteEditando && (
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={limparFormulario}
          >
            <Text style={styles.textoBotao}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.inputBusca}
        placeholder="Buscar cliente..."
        placeholderTextColor="#cbd5e1"
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={styles.subtitulo}>Clientes Cadastrados</Text>

      <FlatList
        data={clientesFiltrados}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.listaVaziaTexto}>🔍 Nenhum nerdola encontrado...</Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#facc15",
    textAlign: "center",
    marginTop: 20,
  },

  formulario: {
    backgroundColor: "#1e293b",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#7c3aed",
  },

  input: {
    borderWidth: 1,
    borderColor: "#facc15",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#0f172a",
    color: "#fff",
  },

  inputBusca: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#1e293b",
    color: "#fff",
  },

  botaoSalvar: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoCancelar: {
    backgroundColor: "#475569",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#facc15",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#7c3aed",
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  info: {
    color: "#cbd5e1",
    marginTop: 5,
  },

  areaBotoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#dab10e",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
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
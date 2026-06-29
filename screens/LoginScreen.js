import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView,
  Image 
} from 'react-native';

// Importa o mesmo logo da pasta assets
import logoImg from '../assets/logo.png'; 

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function lidarLogin() {
    // Validação estática simples e direta para o trabalho
    if (usuario.trim() === 'admin' && senha === 'geek123') {
      // O '.replace' abre a Home e remove a tela de login do histórico (o Admin não consegue "voltar" pro login se apertar o botão voltar do celular)
      navigation.replace('Home'); 
    } else {
      Alert.alert('Erro de Autenticação', 'Usuário ou senha inválidos.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        
        {/* Logo do Robozinho Bonito e Destacado */}
        <View style={styles.logoArea}>
          <Image source={logoImg} style={styles.logo} />
          <Text style={styles.titulo}>Painel Admin</Text>
          <Text style={styles.subtitulo}>Pixel Geek Control</Text>
        </View>

        {/* Formulário de Login */}
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#cbd5e1"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#cbd5e1"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true} // Esconde os caracteres da senha
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.botaoEntrar} onPress={lidarLogin}>
            <Text style={styles.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>

          {/* Link agora simula o envio da senha por e-mail */}
          <TouchableOpacity 
            style={styles.linkFalso} 
            onPress={() => Alert.alert('Recuperação de Senha', 'Uma nova senha de acesso foi enviada para o seu e-mail cadastrado!')}
          >
            <Text style={styles.textoLinkFalso}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
  },
  conteudo: {
    padding: 20,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#1e293b',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#facc15', // Borda amarela combinando com a Home
    marginBottom: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },
  formulario: {
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7c3aed', // Borda roxa padrão dos seus formulários
  },
  input: {
    borderWidth: 1,
    borderColor: '#facc15',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#0f172a',
    color: '#fff',
    fontSize: 16,
  },
  botaoEntrar: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  linkFalso: {
    marginTop: 20,
    alignItems: 'center',
  },
  textoLinkFalso: {
    color: '#cbd5e1',
    fontSize: 14,
    textDecorationLine: 'underline', // Efeito de link clicável de mentira
    opacity: 0.7,
  },
});
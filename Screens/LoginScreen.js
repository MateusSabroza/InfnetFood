import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const USUARIOS = [
  { email: 'admin@admin.com', senha: 'admin123' },
  { email: 'user@user.com', senha: '123456' },
];

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();

  const validar = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha.');
      return;
    }
    const sucesso = login(email, senha);
    if (!sucesso) {
      setErro('E-mail ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>InfnetFood</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#B59173"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#B59173"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={validar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1F1817',
    padding: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B59173',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#B59173',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#543733',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#FEE9D3',
    backgroundColor: '#382622',
    fontSize: 15,
  },
  erro: {
    color: '#ff6b6b',
    marginBottom: 12,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#B59173',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
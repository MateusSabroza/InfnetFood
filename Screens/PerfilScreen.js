import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { useAuth } from '../context/AuthContext';





export default function PerfilScreen({ navigation }) {
  const { usuario, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: usuario.avatar }} style={styles.avatar} />

      <Text style={styles.nome}>{usuario.nome}</Text>
      <Text style={styles.email}>{usuario.email}</Text>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.valor}>{usuario.telefone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.valor}>{usuario.endereco}</Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Pedidos')}
      >
        <Text style={styles.textoBotao}>Meus Pedidos</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Configuracoes')}
      >
        <Text style={styles.textoBotao}>Configurações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1817',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#B59173',
    marginBottom: 16,
    backgroundColor: '#382622',
  },
  nome: {
    color: '#FEE9D3',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#B59173',
    fontSize: 14,
    marginBottom: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#543733',
    marginVertical: 20,
  },
  infoRow: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    color: '#B59173',
    fontSize: 12,
    marginBottom: 4,
  },
  valor: {
    color: '#FEE9D3',
    fontSize: 15,
  },
  botao: {
    width: '100%',
    backgroundColor: '#B59173',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
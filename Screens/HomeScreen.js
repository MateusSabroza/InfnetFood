import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';

const CATEGORIAS = [
  { id: '1', title: 'Lanches', emoji: '🍔' },
  { id: '2', title: 'Bebidas', emoji: '🥤' },
  { id: '3', title: 'Sobremesas', emoji: '🍰' },
  { id: '4', title: 'Pizza', emoji: '🍕' },
  { id: '5', title: 'Promoções', emoji: '🔥' },
  { id: '6', title: 'Salgados', emoji: '🥐' },
  { id: '7', title: 'Sucos', emoji: '🍊' },
  { id: '8', title: 'Açaí', emoji: '🫐' },
  { id: '9', title: 'Massas', emoji: '🍝' },
  { id: '10', title: 'Saladas', emoji: '🥗' },
  { id: '11', title: 'Frutos do Mar', emoji: '🦐' },
  { id: '12', title: 'Carnes', emoji: '🥩' },
  { id: '13', title: 'Vegano', emoji: '🌱' },
  { id: '14', title: 'Café da Manhã', emoji: '☕' },
  { id: '15', title: 'Combos', emoji: '🎁' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>O que você quer pedir?</Text>
      <FlatList
        data={CATEGORIAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Produtos', { categoria: item })}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.textoBotao}>{item.title}</Text>
          </TouchableOpacity>

        )}
      />
      <TouchableOpacity
        style={styles.btnCarrinho}
        onPress={() => navigation.navigate('Carrinho')}
      >
        <Text style={styles.btnCarrinhoTexto}>🛒 Ver Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnPerfil}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.btnPerfilTexto}>👤 Meu Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnMapa}
        onPress={() => navigation.navigate('Mapa')}
      >
        <Text style={styles.btnMapaTexto}>📍 Restaurantes Próximos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1817',
    padding: 16,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B59173',
    marginBottom: 24,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#382622',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#543733',
  },
  emoji: {
    fontSize: 24,
  },
  textoBotao: {
    color: '#FEE9D3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnCarrinho: {
    backgroundColor: '#382622',
    borderWidth: 1,
    borderColor: '#B59173',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnCarrinhoTexto: {
    color: '#B59173',
    fontWeight: 'bold',
  },
  btnPerfil: {
    backgroundColor: '#382622',
    borderWidth: 1,
    borderColor: '#B59173',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPerfilTexto: {
    color: '#B59173',
    fontWeight: 'bold',
  },
  btnMapa: {
    backgroundColor: '#382622',
    borderWidth: 1,
    borderColor: '#B59173',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnMapaTexto: {
    color: '#B59173',
    fontWeight: 'bold',
  },
});
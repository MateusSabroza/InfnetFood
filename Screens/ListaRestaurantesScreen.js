import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';

const RESTAURANTES = [
  { id: '1', nome: 'Confeitaria Colombo', endereco: 'R. Gonçalves Dias, 32 - Centro, Rio de Janeiro' },
  { id: '2', nome: 'Cervantes', endereco: 'Av. Prado Júnior, 335 - Copacabana, Rio de Janeiro' },
  { id: '3', nome: 'Bar Luiz', endereco: 'R. da Carioca, 39 - Centro, Rio de Janeiro' },
  { id: '4', nome: 'Adega Pérola', endereco: 'R. Senhor dos Passos, 41 - Centro, Rio de Janeiro' },
  { id: '5', nome: 'Boteco Casual', endereco: 'R. do Mercado, 30 - Centro, Rio de Janeiro' },
  { id: '6', nome: 'Restaurante Rio Minho', endereco: 'R. do Ouvidor, 10 - Centro, Rio de Janeiro' },
  { id: '7', nome: 'Mosteiro Restaurante', endereco: 'Praça XV de Novembro - Centro, Rio de Janeiro' },
  { id: '8', nome: 'Espírito Santa', endereco: 'R. Almirante Alexandrino, 264 - Santa Teresa, Rio de Janeiro' },
  { id: '9', nome: 'Cais do Oriente', endereco: 'R. Visconde de Itaboraí, 8 - Centro, Rio de Janeiro' },
  { id: '10', nome: 'Café do Centro', endereco: 'Av. Rio Branco, 156 - Centro, Rio de Janeiro' },
];

export default function ListaRestaurantesScreen({ navigation }) {
  const abrirNoMapa = (endereco) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Restaurantes</Text>
      <FlatList
        data={RESTAURANTES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesRestaurante', { restaurante: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.endereco}>📍 {item.endereco}</Text>
            <TouchableOpacity style={styles.botaoMapa} onPress={() => abrirNoMapa(item.endereco)}>
              <Text style={styles.botaoMapaTexto}>Abrir no Mapa</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1F1817', 
    padding: 16, 
    paddingTop: 24 },
  titulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#B59173', 
    marginBottom: 16, 
    textAlign: 'center' },
  lista: { 
    paddingBottom: 24 },
  card: { 
    backgroundColor: '#382622', 
  borderRadius: 10, 
  padding: 16, 
  marginBottom: 12, 
  borderWidth: 1, 
  borderColor: '#543733' },
  nome: { 
    color: '#FEE9D3', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4 },
  endereco: { 
    color: '#B59173', 
    fontSize: 13, 
    marginBottom: 10 },
  botaoMapa: { 
    backgroundColor: '#B59173', 
    paddingVertical: 8, 
    borderRadius: 8, 
    alignItems: 'center' },
  botaoMapaTexto: { 
    color: '#1F1817', 
    fontWeight: 'bold', 
    fontSize: 13 },
});
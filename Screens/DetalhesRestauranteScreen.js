import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';

export default function DetalhesRestauranteScreen({ route }) {
  const { restaurante } = route.params;
  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('https://free-food-menus-api-two.vercel.app/burgers')
      .then((res) => res.json())
      .then((data) => {
        const aleatorio = data[Math.floor(Math.random() * data.length)];
        setItem(aleatorio);
      })
      .catch(() => setErro('Não foi possível carregar o cardápio.'))
      .finally(() => setCarregando(false));
  }, []);

  const abrirNoMapa = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurante.endereco)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.nome}>{restaurante.nome}</Text>
      <Text style={styles.endereco}>📍 {restaurante.endereco}</Text>

      <TouchableOpacity style={styles.botaoMapa} onPress={abrirNoMapa}>
        <Text style={styles.botaoMapaTexto}>Abrir no Mapa</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.secao}>Exemplo do Cardápio</Text>

      {carregando && <ActivityIndicator size="large" color="#B59173" />}

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {item && (
        <View style={styles.cardItem}>
          <Image source={{ uri: item.img }} style={styles.imagemItem} />
          <Text style={styles.nomeItem}>{item.name}</Text>
          <Text style={styles.descricaoItem}>{item.dsc}</Text>
          <Text style={styles.precoItem}>R$ {Number(item.price).toFixed(2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1817',
  },
  content: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 48,
  },
  nome: {
    color: '#FEE9D3',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  endereco: {
    color: '#B59173',
    fontSize: 14,
    marginBottom: 16,
  },
  botaoMapa: {
    backgroundColor: '#B59173',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoMapaTexto: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#543733',
    marginBottom: 20,
  },
  secao: {
    color: '#B59173',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  erro: {
    color: '#ff6b6b',
    textAlign: 'center',
  },
  cardItem: {
    backgroundColor: '#382622',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#543733',
  },
  imagemItem: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  nomeItem: {
    color: '#FEE9D3',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descricaoItem: {
    color: '#B59173',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  precoItem: {
    color: '#FEE9D3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
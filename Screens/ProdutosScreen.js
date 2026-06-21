import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Image } from 'react-native';
import { faker } from '@faker-js/faker';

function gerarProdutos(quantidade) {
  return Array.from({ length: quantidade }, (_, i) => ({
    id: String(i + 1),
    nome: faker.food.dish(),
    preco: parseFloat(faker.commerce.price({ min: 10, max: 80 })),
    descricao: faker.food.description(),
    imagem: `https://loremflickr.com/300/200/food,dish?random=${i}`,
  }));
}

export default function ProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const produtos = useMemo(() => gerarProdutos(10), []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {categoria.emoji} {categoria.title}
      </Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}
          >
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.cardInfo}>
              <Text style={styles.nomeProduto} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </View>
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
    paddingTop: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B59173',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#382622',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#543733',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imagem: {
    width: 100,
    height: 100,
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  nomeProduto: {
    color: '#FEE9D3',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    color: '#B59173',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  preco: {
    color: '#B59173',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
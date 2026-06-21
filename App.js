import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ProdutosScreen from './Screens/ProdutosScreen';
import DetalhesScreen from './Screens/DetalhesScreen';
import CarrinhoScreen from './Screens/CarrinhoScreen';
import PerfilScreen from './Screens/PerfilScreen';
import PedidosScreen from './Screens/PedidosScreen';
import MapaScreen from './Screens/MapaScreen';
import ListaRestaurantesScreen from './Screens/ListaRestaurantesScreen';

import DetalhesRestauranteScreen from './Screens/DetalhesRestauranteScreen';
import CheckoutScreen from './Screens/CheckoutScreen';

import { ThemeProvider } from './context/ThemeContext';
import ConfiguracoesScreen from './Screens/ConfiguracoesScreen';

import { useEffect } from 'react';
import { solicitarPermissao } from './services/notifications';


const Stack = createNativeStackNavigator();

function PublicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PrivateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Produtos" component={ProdutosScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Pedidos" component={PedidosScreen} />
      <Stack.Screen name="ListaRestaurantes" component={ListaRestaurantesScreen} />
      <Stack.Screen name="Mapa" component={MapaScreen} />
      <Stack.Screen name="DetalhesRestaurante" component={DetalhesRestauranteScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />

    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { usuario } = useAuth();
  return usuario ? <PrivateStack /> : <PublicStack />;
}

export default function App() {
  useEffect(() => {
    solicitarPermissao();
  }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
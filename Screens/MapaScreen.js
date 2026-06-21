import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const RESTAURANTES = [
  { id: '1', nome: 'Confeitaria Colombo', lat: -22.9035, lng: -43.1781, endereco: 'R. Gonçalves Dias, 32 - Centro, Rio de Janeiro' },
  { id: '2', nome: 'Cervantes', lat: -22.9711, lng: -43.1858, endereco: 'Av. Prado Júnior, 335 - Copacabana, Rio de Janeiro' },
  { id: '3', nome: 'Bar Luiz', lat: -22.9064, lng: -43.1779, endereco: 'R. da Carioca, 39 - Centro, Rio de Janeiro' },
  { id: '4', nome: 'Adega Pérola', lat: -22.9051, lng: -43.1813, endereco: 'R. Senhor dos Passos, 41 - Centro, Rio de Janeiro' },
  { id: '5', nome: 'Boteco Casual', lat: -22.8997, lng: -43.1825, endereco: 'R. do Mercado, 30 - Centro, Rio de Janeiro' },
  { id: '6', nome: 'Restaurante Rio Minho', lat: -22.9008, lng: -43.1787, endereco: 'R. do Ouvidor, 10 - Centro, Rio de Janeiro' },
  { id: '7', nome: 'Mosteiro Restaurante', lat: -22.8989, lng: -43.1761, endereco: 'Praça XV de Novembro - Centro, Rio de Janeiro' },
  { id: '8', nome: 'Espírito Santa', lat: -22.9176, lng: -43.1869, endereco: 'R. Almirante Alexandrino, 264 - Santa Teresa, Rio de Janeiro' },
  { id: '9', nome: 'Cais do Oriente', lat: -22.8978, lng: -43.1817, endereco: 'R. Visconde de Itaboraí, 8 - Centro, Rio de Janeiro' },
  { id: '10', nome: 'Café do Centro', lat: -22.9028, lng: -43.1764, endereco: 'Av. Rio Branco, 156 - Centro, Rio de Janeiro' },
];

function gerarHtmlMapa() {
  const marcadores = RESTAURANTES.map(
    (r) => `
      L.marker([${r.lat}, ${r.lng}])
        .addTo(map)
        .bindPopup("<b>${r.nome}</b><br>${r.endereco}");
    `
  ).join('\n');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([-22.9035, -43.1796], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          ${marcadores}
        </script>
      </body>
    </html>
  `;
}

export default function MapaScreen({ navigation }) {
  const abrirNoMapaExterno = (endereco) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Restaurantes no Centro do Rio</Text>

      <View style={styles.mapaContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: gerarHtmlMapa() }}
          style={styles.webview}
        />
      </View>

      <Text style={styles.dica}>Toque nos marcadores para ver o nome do restaurante</Text>

      <TouchableOpacity
        style={styles.botaoLista}
        onPress={() => navigation.navigate('ListaRestaurantes')}
      >
        <Text style={styles.botaoListaTexto}>Ver Lista Completa</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B59173',
    marginBottom: 12,
    textAlign: 'center',
  },
  mapaContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#543733',
    marginBottom: 12,
  },
  webview: {
    flex: 1,
  },
  dica: {
    color: '#B59173',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  botaoLista: {
    backgroundColor: '#B59173',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoListaTexto: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
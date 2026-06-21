import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function solicitarPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function notificarStatusPedido(numero, status) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'InfnetFood',
      body: `Seu pedido ${numero} agora está: ${status}`,
    },
    trigger: null,
  });
}
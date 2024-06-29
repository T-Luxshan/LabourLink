import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { IP } from './BASE_IP';

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  connect(userId, onConnected, onError) {
    if (userId) {
      const socket = new SockJS(`http://${IP}:8080/ws`);
      this.stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: onConnected,
        onStompError: onError,
      });
      this.stompClient.activate();
    }
  }

  subscribe(destination, callback) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(destination, callback);
    }
  }

  send(destination, headers, message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({ destination, headers, body: JSON.stringify(message) });
    }
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
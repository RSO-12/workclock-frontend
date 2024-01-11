import { defineStore } from 'pinia'

export const useSocketStore = defineStore('socket', {
  state: () => {
    return {
      socket: null,
      messages: []
    }
  },
  getters: {
  },
  actions: {
    connect(name) {
      this.socket = new WebSocket(`${process.env.VUE_APP_BASE_WS}/start_web_socket?username=${name}`);
      this.socket.onmessage = (m) => {
        const data = JSON.parse(m.data);
        switch (data.event) {
          case "send-message":
            this.messages = [...this.messages, {
              sender: data.username,
              message: data.message,
              timestamp: data.timestamp
            }]
            break;
        }
      }
    },
    send(message) {
      if (!this.socket) return;
      this.socket.send(JSON.stringify({
        event: "send-message",
        message: message
      }))
      console.log(message)
    },
    close() {
      if (this.socket !== null) {
        this.socket.close();
        this.socket = null;
      }
    }
  },
})

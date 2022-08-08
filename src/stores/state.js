import { defineStore } from 'pinia';
import SocketioService from '../services/socketio';

export const stateStore = defineStore({
  id: 'state',
  state: () => ({
    connected: false,
    socket: null,
    messages: [],
    botStatus: '',
    inputTxt: '',

    errorShowing: false,
    errorMsg: ''
  }),
  getters: {
    count: (state) => state.counter,
    status: (state) => {
      if (state.connected) {
        return "Connected";
      }
      return "Connecting ...";
    },
    url: () => {
      return import.meta.env.VITE_APP_SOCKET_ENDPOINT;
    },
    socketSrv: (state) => {
      return state.socket;
    }
  },
  actions: {
    setConnected(value) {
      this.connected = value
    },
    connect() {
      this.socket = new SocketioService(this.url)
      this.socket.setupSocketConnection()
      this.socket.socket.on("connect", () => {
        console.log('connected');
        this.connected = true
      });
      this.socket.socket.on("disconnect", () => {
        console.log('disconnected');
        this.connected = false
      });
      this.socket.socket.on("message", (data) => {
        console.log('got message', data);
        if (data.type == "STATUS") {
          this.botStatus = data.data
        } else if (data.who == "RECOGNIZER") {
          this.inputTxt = data.data
        }
        else {
          let l = this.messages.length;
          const ml = 6;
          if (l > ml) {
            this.messages = this.messages.slice(l - ml)
            l = this.messages.length
          }
          if (l > 0) {
            console.log(data.who, this.messages[l - 1].who)
            if (data.who !== this.messages[l - 1].who) {
              this.messages[l - 1].showDivider = true;
            }
          }
          this.messages.push(data)
        }
      });
    },
    sendTxt(txt) {
      this.socket.sendTxt(txt)
    },
    setInputTxt(txt) {
      this.inputTxt = txt;
    },
    sendAudio(audio) {
      this.socket.sendAudio(audio)
    },
    disconnect() {
      if (this.socket) {
        this.socket.disconnect()
      }
    },
    showError(data) {
      this.errorShowing = true;
      this.errorMsg = data;
    },
    hideError() {
      console.log("hide");
      this.errorShowing = false;
      this.errorMsg = "";
    },
  }
})

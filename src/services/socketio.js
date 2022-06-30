import { io } from 'socket.io-client';

export default class SocketioService {
    socket = null;
    url = "";

    constructor(url) {
        this.url = url;
    }

    setupSocketConnection() {
        this.socket = io(this.url, { autoConnect: true, path: '' });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendTxt(txt) {
        if (this.socket) {
            console.log('send ', txt);
            this.socket.emit('message', txt);
        } else {
            console.warn("no socket")
        }
    }
}

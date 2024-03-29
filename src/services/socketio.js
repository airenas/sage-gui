import { io } from 'socket.io-client';

export default class SocketioService {
    constructor(url) {
        this.socket = null;
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
            console.debug('send ', txt);
            this.socket.emit('message', { type: "TEXT", data: txt });
        } else {
            console.warn("no socket")
        }
    }

    sendAudio(audio) {
        if (this.socket) {
            console.debug('send audio');
            this.socket.emit('message', { type: "AUDIO", data: audio });
        } else {
            console.warn("no socket")
        }
    }

    sendAudioEvent(start, id) {
        if (this.socket) {
            const msg = start ? "AUDIO_START" : "AUDIO_STOP"
            this.socket.emit('message', { type: "EVENT", data: msg, id: id });
        } else {
            console.warn("no socket")
        }
    }
}

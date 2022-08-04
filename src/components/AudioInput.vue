<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
const { connected } = storeToRefs(stateStore())
</script>

<script>

export default {
  name: 'AudioInp',
  data() {
    return {
      mediaRecorder: null,
      audioContext: null,
      stream: null,
      audioLen: 0,
      audioLenStr: "",
      sampleRate: 16000,
      channels: 1,
      store: stateStore()
    };
  },
  methods: {
    mouseDown() {
      this.start();
    },
    mouseUp() {
      console.log('stop recording');
      if (this.audioContext) {
        this.audioContext.close().then(() => {
          this.stopRecording();
        });
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    },
    stopRecording() {
      console.log('stopped recording');
      this.inputStr = 'up';
      this.setAudioLen(0, this.sampleRate);
      this.stream = null;
      this.audioContext = null;
    },
    setAudioLen(len, rate) {
      this.audioLen = len;
      if (rate == 0 || len == 0) {
        this.audioLenStr = ""
      } else {
        const l = len / rate;
        this.audioLenStr = l.toFixed(1).toString() + "s";
      }
    },
    start() {
      navigator.mediaDevices.getUserMedia({ audio: { sampleRate: this.sampleRate, channelCount: this.channels }, video: false }).then(this.startRecording);
    },
    startRecording(stream) {
      const audioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new audioContext();
      const sampleRate = this.audioContext.sampleRate;
      console.log("sampleRate", sampleRate);
      const volume = this.audioContext.createGain();
      const audioInput = this.audioContext.createMediaStreamSource(stream);
      audioInput.connect(volume);
      var bufferSize = 1024 * 8;
      this.mediaRecorder = (this.audioContext.createScriptProcessor || this.audioContext.createJavaScriptNode).call(this.audioContext, bufferSize, this.channels, this.channels);
      var start = Date.now();
      const self = this
      this.mediaRecorder.onaudioprocess = function (e) {
        console.log("recording");
        var left = e.inputBuffer.getChannelData(0);
        let la = new Float32Array(left);
        if (la.length > 0) {
          self.setAudioLen(self.audioLen + la.length, sampleRate)
          self.lenData = self.lenData + la.length
          var end = Date.now();
          var rate = self.audioLen / (end - start);
          console.log(`Rate: ${rate}, time: ${end - start} ms`);
          const pcmData = self.convertToPCM(left);
          self.store.sendAudio(pcmData);
        }
      }
      volume.connect(this.mediaRecorder);
      this.mediaRecorder.connect(this.audioContext.destination);
      this.stream = stream;
    },

    convertToPCM(data) {
      const res = new Int16Array(data.length);
      for (var i = 0; i < data.length; i++) {
        var n = data[i];
        n = n < 0 ? n * 32768 : n * 32767;
        res[i] = Math.max(-32768, Math.min(32768, n));
      }
      return res
    },
  },
};
</script>

<template>
  <div class="mic-button">
    <v-btn class="ma-2" :color="audioLenStr === '' ? 'green' : 'error'" rounded size="x-large" @mousedown="mouseDown"
      @mouseup="mouseUp" @mouseleave="mouseUp" :disabled="connected == false">{{ audioLenStr }}
      <v-icon v-if="audioLenStr === ''">mic</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.mic-button {
  top: -5px;
}

@media (min-width: 1024px) {}
</style>
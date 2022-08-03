<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
const { connected } = storeToRefs(stateStore())
</script>

<script>

export default {
  name: 'Audio',
  data() {
    return {
      inputStr: 'olia',
      mediaRecorder: null,
      audioContext: null,
      stream: null,
      lenData: 0,
      sampleRate: 16000,
      channels: 1,
      store: stateStore()
    };
  },
  methods: {
    mouseDown(data) {
      this.start();
      this.inputStr = 'down';
    },
    mouseUp(data) {
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
      this.lenData = 0;
      this.stream = null;
      this.audioContext = null;
    },
    start() {
      navigator.mediaDevices.getUserMedia({ audio: { sampleRate: this.sampleRate, channelCount: this.channels }, video: false }).then(this.startRecording);
    },
    startRecording(stream) {
      // const options = { mimeType: 'audio/webm' };
      //const options = { mimeType: 'audio/wav' };
      //this.mediaRecorder = new MediaRecorder(stream, options);
      const audioContext = window.AudioContext || window.webkitAudioContext;
      // this.audioContext = new audioContext({ sampleRate: 16000 });
      this.audioContext = new audioContext();
      console.log(stream);
      const sampleRate = this.audioContext.sampleRate;
      console.log("sampleRate", sampleRate);
      const volume = this.audioContext.createGain();
      console.log(volume);
      const audioInput = this.audioContext.createMediaStreamSource(stream);
      console.log(audioInput);
      audioInput.connect(volume);
      var bufferSize = 1024 * 8;
      this.mediaRecorder = (this.audioContext.createScriptProcessor || this.audioContext.createJavaScriptNode).call(this.audioContext, bufferSize, this.channels, this.channels);
      console.log(this.mediaRecorder);
      var start = Date.now();
      const self = this
      this.mediaRecorder.onaudioprocess = function (e) {
        console.log("recording");
        var left = e.inputBuffer.getChannelData(0);
        let la = new Float32Array(left);
        console.log(la.length);
        console.log(la);
        if (la.length > 0) {
          self.lenData = self.lenData + la.length
          console.log(self.lenData);
          var end = Date.now();
          var rate = self.lenData / (end - start);
          console.log(`Rate: ${rate}, time: ${end - start} ms`);
          const pcmData = self.convertToPCM(left);
          self.store.sendAudio(pcmData);
        }
      }
      volume.connect(this.mediaRecorder);
      this.mediaRecorder.connect(this.audioContext.destination);
      this.stream = stream;
    },

    //   self = this
    //   this.mediaRecorder.addEventListener('dataavailable', function (e) {
    //   console.log("on data")

    //   if (e.data.size > 0) {
    //     self.lenData = self.lenData + e.data.size
    //     self.store.sendAudio(e.data)
    //   }
    // });

    //   this.mediaRecorder.addEventListener('stop', function () {
    //     console.log("stop event")
    //     self.stopRecording();
    //   });

    //   this.mediaRecorder.start(1000);
    //   console.log("started")
    // },
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
  <div class="greetings">
    <button @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
      {{ inputStr }}
    </button>
    <v-btn elevation="2">Olia</v-btn>
    {{ lenData }}
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

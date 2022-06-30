<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { connected } = storeToRefs(stateStore())
</script>

<script>
import { stateStore } from '../stores/state'

export default {
  name: 'Audio',
  data() {
    return {
      inputStr: 'olia',
      mediaRecorder: null,
      lenData: 0,
      store: stateStore()
    };
  },
  methods: {
    mouseDown(data) {
      this.start();
      this.inputStr = 'down';
    },
    mouseUp(data) {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
    },
    stopRecording() {
      this.inputStr = 'up';
      self.lenData = 0
    },
    start() {
      navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 }, video: false }).then(this.startRecording);
    },
    startRecording(stream) {
      const options = { mimeType: 'audio/webm' };
      this.mediaRecorder = new MediaRecorder(stream, options);

      self = this
      this.mediaRecorder.addEventListener('dataavailable', function (e) {
        console.log("on data")

        if (e.data.size > 0) {
          self.lenData = self.lenData + e.data.size
          self.store.sendAudio(e.data)
        }
      });

      this.mediaRecorder.addEventListener('stop', function () {
        console.log("stop event")
        self.stopRecording();
      });

      this.mediaRecorder.start(1000);
      console.log("started")
    },
  },
};
</script>

<template>
  <div class="greetings">
    <button @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
      {{ inputStr }}
    </button>
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

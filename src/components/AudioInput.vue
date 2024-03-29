<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
const { connected, canListen } = storeToRefs(stateStore())
</script>

<script>
import { i18n } from '../i18n';
import AudioProcessor from '../services/audio';

export default {
  name: 'AudioInp',
  data() {
    return {
      mediaRecorder: null,
      audioContext: null,
      stream: null,
      audioLen: 0,
      audioLenStr: "",
      audioID: "",
      sampleRate: 16000,
      channels: 1, // not prepared to work with a value 2
      store: stateStore(),
      timer: null,
      timeout: 10000,
      working: false,
      resampler: null,
    };
  },
  methods: {
    mouseDown() {
      console.debug('mouse down');
      this.start();
    },
    mouseLeave() {
      console.debug('mouse leave');
      this.stop();
    },
    mouseUp() {
      console.debug('mouse up');
      this.stop();
    },
    stop() {
      if (this.audioContext) {
        this.audioContext.close().then(() => {
          this.stopRecording();
        });
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      this.clearTimer();
    },
    stopRecording() {
      console.debug('stopped recording');
      this.working = false;
      this.setAudioLen(0, this.sampleRate);
      this.stream = null;
      this.audioContext = null;
      this.store.socketSrv.sendAudioEvent(false, this.audioID);
      this.audioID = "";
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = null;
    },
    setAudioLen(len, rate) {
      this.audioLen = len;
      if (rate == 0 || len == 0) {
        this.audioLenStr = ""
      } else {
        const l = len / rate;
        this.audioLenStr = this.toSecStr(l.toFixed(0));
      }
    },
    start() {
      navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: this.sampleRate,
          channelCount: this.channels,
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: true
        },
        video: false
      })
        .then(this.startRecording).catch(e => {
          this.store.showError(i18n.global.t('input.micError', { err: e }))
        });
    },
    startRecording(stream) {
      if (this.working) {
        return
      }
      this.working = true;
      this.clearTimer();
      this.timer = window.setTimeout(this.mouseUp, this.timeout);
      console.log('start recording');
      const audioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new audioContext();
      const sampleRate = this.audioContext.sampleRate;
      console.log(`sampleRate: ${sampleRate}, targetRate: ${this.sampleRate}`);
      this.resampler = new AudioProcessor(sampleRate, this.sampleRate);
      const volume = this.audioContext.createGain();
      const audioInput = this.audioContext.createMediaStreamSource(stream);
      audioInput.connect(volume);
      var bufferSize = 1024 * 8;
      this.mediaRecorder = (this.audioContext.createScriptProcessor || this.audioContext.createJavaScriptNode).call(this.audioContext, bufferSize, this.channels, this.channels);
      var start = Date.now();
      const self = this;
      this.audioID = Date.now().toString();
      self.store.socketSrv.sendAudioEvent(true, this.audioID);
      this.mediaRecorder.onaudioprocess = function (e) {
        console.debug("on audio data");
        var buffer = e.inputBuffer.getChannelData(0);
        if (buffer.length > 0) {
          self.setAudioLen(self.audioLen + buffer.length, sampleRate)
          self.lenData = self.lenData + buffer.length
          var end = Date.now();
          var rate = self.audioLen / (end - start);
          console.debug(`Rate: ${rate}, time: ${end - start} ms`);
          const pcmData = self.resampler.downsampleAndConvertToPCM(buffer);
          console.debug(`len orig: ${buffer.length}, downsampled: ${pcmData.length}`);
          self.store.sendAudio(pcmData);
        }
      }
      volume.connect(this.mediaRecorder);
      this.mediaRecorder.connect(this.audioContext.destination);
      this.stream = stream;
    },
    toSecStr(sec) {
      const m = (sec / 60).toFixed(0)
      const s = sec - m * 60
      if (s < 10) {
        return m.toString() + ":0" + s.toString()
      }
      return m.toString() + ":" + s.toString()
    },
  },
};
</script>

<template>
  <div class="mic-button">
    <v-btn class="ma-2" :class="audioLenStr === '' ? 'stopped' : 'recording'" rounded size="x-large"
      @mousedown.left="mouseDown" @mouseup.left="mouseUp" @mouseleave="mouseLeave" :disabled="connected == false || !canListen"><span
        class="recording-text">{{
            audioLenStr
        }}</span>
      <v-icon v-if="audioLenStr === ''">mic</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
@import './../assets/base.css';

.mic-button {
  top: 0px;
}

.recording {
  background-color: #EF5350;
  color: var(--vt-c-white);
  padding-left: 0px;
  padding-right: 0px;
}

.stopped {
  background-color: var(--color-green);
  color: var(--vt-c-black);
}

.recording-text {
  font-weight: 600;
  font-size: 130%;
  padding: 0 0 0 0;
  text-indent: 0px;
}

@media (min-width: 1024px) {}
</style>

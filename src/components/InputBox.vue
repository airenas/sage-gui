<script setup>
import Audio from './Audio.vue'
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { connected, sendTxt } = storeToRefs(stateStore())
</script>

<script>
import { stateStore } from '../stores/state'

export default {
  name: 'InputBox',
  data() {
    return {
      inputStr: '',
    };
  },
  methods: {
    onEnter() {
      stateStore().sendTxt(this.inputStr)
      this.inputStr = '';
    },
  },
};
</script>

<template>
  <div class="input">
    <v-row>
      <v-text-field v-on:keyup.enter="onEnter" v-model="inputStr" :disabled="connected == false"
        placeholder="Rašykite arba paspauskite ir pasakykite ->" variant="outlined"></v-text-field>
      <Audio></Audio>
    </v-row>
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

.input h1,
.input h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .input h1,
  .input h3 {
    text-align: left;
  }
}
</style>

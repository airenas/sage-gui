<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
import AudioInput from './AudioInput.vue';
const { connected, inputTxt } = storeToRefs(stateStore())
</script>

<script>

export default {
  name: 'InputBox',
  data() {
    return {
      store: stateStore()
    };
  },
  methods: {
    onEnter() {
      stateStore().sendTxt(this.store.inputTxt);
      this.store.setInputTxt('');
    },
  },
};
</script>

<template>
  <div class="input">
    <v-row>
      <v-text-field v-on:keyup.enter="onEnter" v-model="inputTxt" :disabled="connected == false"
        placeholder="Rašykite arba spauskite ir kalbėkite ---->" variant="outlined"></v-text-field>
      <AudioInput></AudioInput>
    </v-row>
  </div>
</template>

<style scoped>
.input {
  padding-left: 20px;
  padding-top: 40px;
  min-width: 600px;
}

.input input {
  font-size: 300% important !;
}

@media (min-width: 1024px) {}
</style>

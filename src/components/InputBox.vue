<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
import Audio from './Audio.vue';
const { connected, sendTxt } = storeToRefs(stateStore())
</script>

<script>

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
.input {
  padding-left: 20px;
  min-width: 500px;
}

.input input {
  font-size: 200% important !;
}

@media (min-width: 1024px) {}
</style>

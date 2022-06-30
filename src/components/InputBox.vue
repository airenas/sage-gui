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
  <div class="greetings">
    <div id="app">
      <input v-on:keyup.enter="onEnter" v-model="inputStr" :disabled="connected == false" />
    </div>
    <Audio />
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

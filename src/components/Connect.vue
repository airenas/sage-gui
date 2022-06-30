<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { counter, status, url, connected, botStatus } = storeToRefs(stateStore())

defineProps({
  msg: {
    type: String,
    required: true
  }
}) 
</script>

<template>
  <div class="greetings">
    <h3 v-if="connected" class="green">{{ status }}</h3>
    <h1 v-if="connected" class="green">... {{ botStatus }}</h1>
    <h3 v-if="!connected" class="green">Connecting to {{ url }}. Count: {{ counter }}</h3>
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

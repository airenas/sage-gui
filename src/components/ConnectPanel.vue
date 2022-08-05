<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { url, connected, botStatus } = storeToRefs(stateStore())
</script>

<template>
  <div class="greetings" :class="[connected ? 'inactive' : 'active']">
    <!-- <h3 v-if="connected" class="green" :class="{ inactive: connected }">{{ status }}</h3> -->
    <div v-if="connected" class="green">... {{ botStatus }}</div>
    <div v-if="!connected" class="green">Connecting to {{ url }}</div>
  </div>
</template>

<style scoped>
@import './../assets/base.css';

.greetings {
  text-align: center;
  font-weight: 500;
}

.greetings.inactive {
  transition: 3s;
  font-size: 200%;
}

.greetings.active {
  transition: 3s;
  font-size: 140%;
}

@media (min-width: 1024px) {}
</style>

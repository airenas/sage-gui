<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { url, connected, botStatus } = storeToRefs(stateStore())
</script>

<template>
  <div class="greetings" :class="[connected ? 'inactive' : 'active']">
    <!-- <h3 v-if="connected" class="green" :class="{ inactive: connected }">{{ status }}</h3> -->
    <div v-if="connected" class="green">... {{ $t('status.' + botStatus) }}</div>
    <div class="connecting" v-if="!connected">
      <div class="green connecting-info">{{ $t('main.connecting', { url: url }) }}</div>
      <v-progress-circular color="hsla(160, 100%, 37%, 1)" indeterminate rounded height="5"></v-progress-circular>
    </div>
    <!-- <v-progress-linear color="hsla(160, 100%, 37%, 1)" indeterminate rounded height="5"></v-progress-linear> -->
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

.connecting {
  display: inline-flex;
}

.connecting-info {
  margin-right: 10px;
}

@media (min-width: 1024px) {}
</style>

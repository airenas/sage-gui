<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
const { messages } = storeToRefs(stateStore())
</script>

<template>
  <div class="greetings">
    <div v-for="item in messages">
      <div v-if="item.type == 'SVG'">
        <span>BOT:</span><p v-html="item.data"></p>
      </div>
      <div v-else-if="item.type == 'TEXT'">
        <span>BOT:</span><h1>{{ item.data }}</h1>
      </div>
      <div v-else>
        <span>BOT:</span>{{ item.type }} : {{ item.data }}
      </div>
    </div>
    <!-- <div>
      <h3>{{ botStatus }}</h3>
    </div> -->
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

<script setup>
import { storeToRefs } from 'pinia'
import { stateStore } from '../stores/state'
import TxtMessage from './TxtMessage.vue';
import ImgMessage from './ImgMessage.vue';
const { messages } = storeToRefs(stateStore())
</script>

<template>
  <div class="greetings">
    <div v-for="item in messages" :key="item.id">
      <div v-if="item.type == 'SVG'">
        <ImgMessage :svg="item.data" :res="item.data2" :bot="item.who === 'BOT'"></ImgMessage>
      </div>
      <div v-else-if="item.type == 'TEXT'">
        <TxtMessage :text="item.data" :bot="item.who === 'BOT'"></TxtMessage>
      </div>
      <div v-else>
        <span>BOT:</span>{{ item.type }} : {{ item.data }}
      </div>
      <div v-if="item.showDivider" class="divider">
        <v-divider></v-divider>
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

.divider{
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 2%;
  padding-right: 2%;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

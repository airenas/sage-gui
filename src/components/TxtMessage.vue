<script setup>
import { stateStore } from '../stores/state';
import MessageItem from './MessageItem.vue';
</script>

<script>

export default {
  name: 'TxtMessage',
  data() {
    return {
      clickCount: 0,
      store: stateStore(),
    };

  },
  props: {
    text: {
      type: String,
      required: true
    },
    bot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    click() {
      this.clickCount++;
      if (this.clickCount == 2) {
        console.log("clicked");
        this.clickCount = 0;
        this.store.setInputTxt(this.text);
      }
    },
  },
};
</script>

<template>
  <MessageItem :bot="bot"><span v-on:click="click">{{ text }}</span></MessageItem>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>

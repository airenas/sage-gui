<script setup>
import MessageItem from './MessageItem.vue';
defineProps({
  svg: {
    type: String,
    required: true
  },
  bot: {
    type: Boolean,
    default: true
  }
}) 
</script>

<template>
  <MessageItem :bot="bot">
    <p v-html="svg"></p>
  </MessageItem>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
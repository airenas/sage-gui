<script setup>
import MessageItem from './MessageItem.vue';
defineProps({
  text: {
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
  <MessageItem :bot="bot"><span>{{ text }}</span></MessageItem>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>

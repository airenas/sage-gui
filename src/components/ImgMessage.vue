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

<script>

export default {
  name: 'ImgMessage',
  data() {
    return {
      url: null,
      blob: null,   
    };
  },
  beforeMount() {
    console.debug('created image file');
    this.blob = this.createFile(this.svg)
    this.url = URL.createObjectURL(this.blob);
  },
  unmounted() {
    if (this.url){
      URL.revokeObjectURL(this.url);
    }
    this.blob = null;
    console.debug('unmounted image file');
  },
  methods: {
    createFile(svg) {
      return new Blob([svg], { type: 'image/svg+xml' })
    },
  },
};
</script>

<template>
  <MessageItem :bot="bot">
    <img :src="url" />
  </MessageItem>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
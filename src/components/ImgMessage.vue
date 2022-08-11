<script setup>
import MessageItem from './MessageItem.vue';
defineProps({
  svg: {
    type: String,
    required: true
  },
  res: {
    type: String,
    required: false
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
    if (this.url) {
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
    <div class="formula-res">
      <img :src="url" />
      <span class="result-span" v-if="res !== ''"> = {{ res }}</span>
    </div>
  </MessageItem>
</template>

<style scoped>
.formula-res {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
}

.result-span {
  padding-left: 8px;
  font-size: 110%;
  font-weight: 500;
  /* font-style: italic; */
}

@media (min-width: 1024px) {}
</style>
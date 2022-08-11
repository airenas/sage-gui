<script setup>
import { storeToRefs } from 'pinia';
import { stateStore } from '../stores/state';
const { errorShowing, errorMsg } = storeToRefs(stateStore())
</script>

<script>

export default {
  name: 'ErrorDiv',
  data() {
    return {
      store: stateStore()
    };
  },
  methods: {
    hide() {
      this.store.hideError();
    },
  },
};
</script>

<template>
  <div class="text-center">
    <v-snackbar v-model="errorShowing" multi-line>
      <span class="err-msg">
        {{ errorMsg }}</span>
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="hide">
          {{ $t('main.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
@import './../assets/base.css';

.err-msg {
  color: var(--color-text);
}

@media (min-width: 1024px) {}
</style>

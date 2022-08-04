<script setup>
defineProps({
  bot: {
    type: Boolean,
    default: true
  }
}) 
</script>

<script>
export default {
  name: 'MessageItem',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<template>
  <div v-if="bot">
    <v-row align="center">
      <div class="avatar"><span class="av-name">B</span></div>
      <div class="message">
        <slot></slot>
      </div>
    </v-row>
  </div>
  <div v-if="!bot">
    <v-row align="center" class="right-align">
      <div class="message user">
        <slot></slot>
      </div>
      <div class="avatar user"><span class="av-name">U</span></div>
    </v-row>
  </div>
</template>

<style scoped>
@import './../assets/base.css';
.message {
  clear: both;
  /* float: left; */
  padding: 6px 10px 7px;
  -webkit-border-radius: 20px 20px 20px 0;
  -moz-border-radius: 20px 20px 20px 0;
  border-radius: 20px 20px 20px 0;
  background: var(--color-baloon-background);
  margin: 8px 0;
  font-size: 20px;
  line-height: 1.1;
  margin-left: 5px;
  position: relative;
  color: var(--color-baloon-text);
  border: 1px solid var(--color-baloon-text);
}

.message.user {
  -webkit-border-radius: 20px 20px 0px 20px;
  -moz-border-radius: 20px 20px 0px 20px;
  border-radius: 20px 20px 0px 20px;
  background: var(--color-baloon-background-user);
  /* #95a5a6; */
  color: var(--color-baloon-text-user);
  /* #273746; */
}

.avatar {
  width: 25px;
  height: 25px;
  background-position: top center;
  border-radius: 50%;
  background-color: blueviolet;
  font-size: 80%;
  align-content: center;
  display: flex;
  text-align: center;
}

.avatar.user {
  background-color: chocolate;
  margin-left: 10px;
}

.av-name {
  width: 100%;
  height: 100%;
  align-content: center;
  display: inline-grid;
  text-align: center;
}

.right-align {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 0;
}

@media (min-width: 1024px) {}
</style>

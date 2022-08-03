<script setup>
import ConnectPanel from './components/ConnectPanel.vue'
import InputBox from './components/InputBox.vue'
import MessageList from './components/MessageList.vue'
</script>

<script>
import { stateStore } from './stores/state'

export default {
  mounted() {
    console.log('mounted');
  },
  created() {
    console.log('created');
    stateStore().connect();
  },
  beforeUnmount() {
    stateStore().disconnect();
  }
};
</script>

<template>
  <header>
    <img alt="Intelektika logo" class="logo" src="./assets/intelektika_logo.png" width="125" height="125" />

    <div class="wrapper">
      <ConnectPanel />
    </div>
  </header>

  <main>
    <div class="wrapper">
      <MessageList />
    </div>
    <div class="wrapper-main">
      <InputBox />
    </div>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>

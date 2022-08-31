<script setup>
import { storeToRefs } from 'pinia';
import ConnectPanel from './components/ConnectPanel.vue';
import ErrorDiv from './components/ErrorDiv.vue';
import InputBox from './components/InputBox.vue';
import MessageList from './components/MessageList.vue';
import { stateStore } from './stores/state';
const { connected } = storeToRefs(stateStore())
</script>

<script>
import { useI18n } from 'vue-i18n';

export default {
  mounted() {
    console.log('mounted');
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    document.title = t('main.title');
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
    <div class="header-container">
      <img alt="Intelektika logo" class="logo" :class="[connected ? 'inactive logo-small' : 'active logo-big']"
        src="./assets/intelektika_logo.png" />
      <div class="wrapper">
        <ConnectPanel />
      </div>
    </div>
  </header>

  <main>
    <div class="messages">
      <div class="wrapper" :class="[connected ? 'active' : 'inactive']">
        <MessageList />
      </div>
      <div class="wrapper-main" :class="[connected ? 'active' : 'inactive']">
        <InputBox />
      </div>
    </div>
    <ErrorDiv></ErrorDiv>
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

.logo {
  display: block;
  margin: 0 auto 1rem;
}

.logo-big {
  transition: 3s;
  width: 125px;
  height: 125px;
}

.logo-small {
  transition: 3s;
  width: 50px;
  height: 50px;
}

a,
.green {
  text-decoration: none;
  color: var(--color-green);
  transition: 0.4s;
}

.warn {
  text-decoration: none;
  color: var(--color-warn);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.messages {
  margin: auto;
  place-items: center;
  max-width: 700px;
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
    width: 100%;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .header-container {
    width: 100%;
    display: grid;
    justify-content: right;
  }

  .logo {
    margin: 0px 20px 20px auto;
  }
}
</style>

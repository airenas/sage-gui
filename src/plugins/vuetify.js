// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure your project is capable of 
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { aliases, md } from 'vuetify/iconsets/md';
const mq = window.matchMedia('(prefers-color-scheme: dark)')

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: mq.matches,
      },
    },
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})

mq.addEventListener('change', (e) => {
  vuetify.framework.theme.dark = e.matches
})

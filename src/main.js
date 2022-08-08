import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from './i18n'
import { vuetify } from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
const app = createApp(App)
const i18n = createI18n('lt')

app.use(createPinia())
app.use(vuetify)
app.use(i18n)

app.mount('#app')

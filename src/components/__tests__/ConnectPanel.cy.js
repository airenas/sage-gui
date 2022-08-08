import { createPinia, setActivePinia } from 'pinia';
// import { createApp } from 'vue';
// import App from '../../App.vue';
import { vuetify } from '../../plugins/vuetify';
import TxtM from '../TxtM.vue';
// import {createVuetify} from "vuetify"
// import * as components from "vuetify/components"
// import * as directives from "vuetify/directives"

// const app = createApp(App)
// app.use(vuetify);
//const vuetifyPl = vuetify

describe('TxtM', () => {

  const vuetifyPl = vuetify
  
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('playground', () => {
    cy.mount(TxtM, {
      global: {
        mocks: {
          $t: (msg) => { msg }
        }
      },
      plugins: {
        vuetifyPl
      },
      props: {},
    })
  })

  it('renders properly', () => {
    cy.mount(TxtM, { props: { msg: 'Hello Cypress' } })
    cy.get('h1').should('contain', 'Hello Cypress')
  })
})

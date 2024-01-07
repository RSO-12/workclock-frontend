import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import vuetify from './plugins/vuetify.js'

// Pinia
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(router);
app.mount('#app');

export {
    app
};
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Services
import RequestService from './services/request.service'
import TokenService from './services/token.service'

// Event library
import VueEventer from 'vue-eventer';

// Vuetify
import vuetify from './plugins/vuetify.js'

// Pinia
import { createPinia } from 'pinia'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

const pinia = createPinia()
const app = createApp(App);
RequestService.init(process.env.VUE_APP_BASE_API)
TokenService.readFromStorage();
app.config.globalProperties.$eventBus = new VueEventer();
app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(router);
app.mount('#app');

export {
    app
};
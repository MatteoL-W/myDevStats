import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import {TroisJSVuePlugin} from 'troisjs';

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(TroisJSVuePlugin).mount('#app')

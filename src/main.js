import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import { TroisJSVuePlugin } from 'troisjs'
import VueApexCharts from 'vue3-apexcharts'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).
  use(router).
  use(TroisJSVuePlugin).
  use(VueApexCharts).
  mount('#app')

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title + ' - myDevStats' : 'Weird Page - myDevStats'
    next()
})
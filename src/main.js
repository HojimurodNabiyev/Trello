import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Dialog, Dark } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './styles/style.css'
import App from './App.vue'

const pinia = createPinia()
const myApp = createApp(App)

myApp.use(Quasar, {plugins: {Notify, Dialog, Dark}, config: {brand: {primary: 'trnasparent'}}})
myApp.use(router)
myApp.use(pinia)

myApp.mount('#app')


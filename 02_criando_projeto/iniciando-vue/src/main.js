import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Cria uma instância do vue, que substitui o new Vue
const app = createApp(App);

// Renderiza e anexa o componente no DOM
app.mount('#app')

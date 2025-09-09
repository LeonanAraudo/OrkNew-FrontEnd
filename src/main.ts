import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router/index'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options:{
            darkModeSelector: "class"
        }
    }
});
app.mount('#app')

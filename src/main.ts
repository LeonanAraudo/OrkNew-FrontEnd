import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App)
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

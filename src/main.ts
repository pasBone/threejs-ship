import "normalize.css";
import { TroisJSVuePlugin } from 'troisjs';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App';

createApp(App)
  .use(createPinia())
  .use(TroisJSVuePlugin)
  .mount('#app');
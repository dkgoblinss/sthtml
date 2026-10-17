import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

// 等待 MVU 初始化完成后再挂载
waitForMvuInit(() => {
  const app = createApp(App);
  app.mount('#app');
});

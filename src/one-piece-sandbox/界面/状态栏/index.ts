import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

// 等待 MVU 初始化完成
window.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('app');
  if (mountPoint) {
    createApp(App).mount(mountPoint);
  }
});

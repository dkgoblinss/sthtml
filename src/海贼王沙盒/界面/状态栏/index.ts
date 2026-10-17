import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './global.css';

// 等待 DOM 加载完成和 MVU 初始化
$(() => {
  console.info('[海贼王沙盒] 状态栏界面开始加载');
  
  // 等待 MVU 初始化
  const checkMvuReady = setInterval(() => {
    if (typeof Mvu !== 'undefined' && Mvu.isReady?.()) {
      clearInterval(checkMvuReady);
      
      console.info('[海贼王沙盒] MVU 已准备就绪，初始化 Vue 应用');
      
      // 创建 Vue 应用
      const app = createApp(App);
      const pinia = createPinia();
      
      app.use(pinia);
      
      // 挂载到 body
      app.mount('body');
      
      console.info('[海贼王沙盒] 状态栏界面加载完成');
    }
  }, 100);
  
  // 超时保护（10秒后强制加载）
  setTimeout(() => {
    if (document.querySelector('#app') === null) {
      console.warn('[海贼王沙盒] MVU 初始化超时，尝试强制加载');
      clearInterval(checkMvuReady);
      
      const app = createApp(App);
      const pinia = createPinia();
      app.use(pinia);
      app.mount('body');
    }
  }, 10000);
});

// 页面卸载时的清理
$(window).on('pagehide', () => {
  console.info('[海贼王沙盒] 状态栏界面卸载');
});

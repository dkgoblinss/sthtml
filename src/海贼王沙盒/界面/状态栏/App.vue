<template>
  <div class="status-bar-container">
    <!-- 左侧角色图片区 -->
    <LeftPanel 
      :current-character="currentCharacter"
      @change-character="handleCharacterChange"
    />
    
    <!-- 右侧数值展示区 -->
    <RightPanel 
      :character-data="currentCharacterData"
      :current-character="currentCharacter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDataStore } from './store';
import LeftPanel from './components/LeftPanel.vue';
import RightPanel from './components/RightPanel.vue';

const store = useDataStore();

// 当前选中的角色
const currentCharacter = ref<'娜美' | '罗宾' | '薇薇'>('娜美');

// 获取当前角色的数据
const currentCharacterData = computed(() => {
  if (!store.data) return null;
  return store.data[currentCharacter.value];
});

// 切换角色
const handleCharacterChange = (character: '娜美' | '罗宾' | '薇薇') => {
  currentCharacter.value = character;
};
</script>

<style scoped>
.status-bar-container {
  display: flex;
  width: 100%;
  min-width: 800px;
  background: var(--c-bg-dark);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--c-border);
  animation: fade-in 0.4s ease-out;
}

@media (max-width: 800px) {
  .status-bar-container {
    flex-direction: column;
    min-width: unset;
  }
}
</style>

<template>
  <div class="left-panel">
    <!-- 角色大图 -->
    <div class="character-image-wrapper">
      <img 
        :src="characterImages[currentCharacter]" 
        :alt="currentCharacter"
        class="character-image"
        @click="cycleCharacter"
      />
      <div class="image-overlay">
        <span class="click-hint">点击切换</span>
      </div>
    </div>
    
    <!-- 角色切换按钮组 -->
    <div class="character-tabs">
      <button
        v-for="char in characters"
        :key="char"
        :class="['tab-button', { active: currentCharacter === char }]"
        @click="$emit('changeCharacter', char)"
      >
        <img :src="characterAvatars[char]" :alt="char" class="tab-avatar" />
        <span class="tab-name">{{ char }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentCharacter: '娜美' | '罗宾' | '薇薇';
}>();

const emit = defineEmits<{
  changeCharacter: [character: '娜美' | '罗宾' | '薇薇'];
}>();

const characters: Array<'娜美' | '罗宾' | '薇薇'> = ['娜美', '罗宾', '薇薇'];

// 角色大图（占位，实际使用时替换为真实图片 URL）
const characterImages = {
  '娜美': 'https://via.placeholder.com/200x300/FF6B9D/ffffff?text=Nami',
  '罗宾': 'https://via.placeholder.com/200x300/9D4EDD/ffffff?text=Robin',
  '薇薇': 'https://via.placeholder.com/200x300/4A90E2/ffffff?text=Vivi'
};

// 角色头像（小图标）
const characterAvatars = {
  '娜美': 'https://via.placeholder.com/40x40/FF6B9D/ffffff?text=N',
  '罗宾': 'https://via.placeholder.com/40x40/9D4EDD/ffffff?text=R',
  '薇薇': 'https://via.placeholder.com/40x40/4A90E2/ffffff?text=V'
};

// 循环切换角色
const cycleCharacter = () => {
  const currentIndex = characters.indexOf(props.currentCharacter);
  const nextIndex = (currentIndex + 1) % characters.length;
  emit('changeCharacter', characters[nextIndex]);
};
</script>

<style scoped>
.left-panel {
  width: 200px;
  background: var(--c-bg-light);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--c-border);
  flex-shrink: 0;
}

/* 角色大图区域 */
.character-image-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  cursor: pointer;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-image-wrapper:hover .character-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.character-image-wrapper:hover .image-overlay {
  opacity: 1;
}

.click-hint {
  color: var(--c-text-primary);
  font-size: 12px;
  display: block;
  text-align: center;
}

/* 角色切换按钮组 */
.character-tabs {
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 8px;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--c-bg-dark);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--c-text-secondary);
}

.tab-button:hover {
  background: var(--c-bg-elevated);
  border-color: var(--c-border-hover);
  transform: translateX(4px);
}

.tab-button.active {
  background: var(--c-primary);
  border-color: var(--c-primary);
  color: var(--c-text-primary);
  box-shadow: 0 0 15px var(--c-glow-primary);
}

.tab-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid currentColor;
}

.tab-name {
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 800px) {
  .left-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--c-border);
  }
  
  .character-image-wrapper {
    height: 200px;
  }
  
  .character-tabs {
    flex-direction: row;
  }
  
  .tab-button:hover {
    transform: translateY(-2px);
  }
}
</style>

<template>
  <div class="header-bar">
    <div class="left-section">
      <h2 class="character-name">{{ characterName }}</h2>
      <StageTag :stage="stage" />
    </div>
    
    <div class="right-section">
      <button class="ntr-button" @click="$emit('showNtr')" title="隐秘记录">
        <i class="fa fa-eye-slash"></i>
        <span class="ntr-hint">秘密</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import StageTag from './StageTag.vue';

defineProps<{
  characterName: string;
  stage: '陌生' | '暧昧' | '好感' | '沉沦' | '受精';
}>();

defineEmits<{
  showNtr: [];
}>();
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--c-border);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.character-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0;
}

.right-section {
  display: flex;
  align-items: center;
}

.ntr-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 107, 157, 0.1);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  animation: breathe 3s ease-in-out infinite;
}

.ntr-button:hover {
  background: var(--c-primary);
  color: var(--c-text-primary);
  border-color: var(--c-primary);
  transform: scale(1.05);
  box-shadow: 0 0 15px var(--c-glow-primary);
  animation: none;
}

.ntr-button i {
  font-size: 16px;
}

.ntr-hint {
  font-size: 12px;
}

@media (max-width: 800px) {
  .header-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .character-name {
    font-size: 18px;
  }
}
</style>

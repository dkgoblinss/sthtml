<template>
  <span :class="['stage-tag', `stage-${stage}`]">
    <i :class="stageIcon"></i>
    <span>{{ stage }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  stage: '陌生' | '暧昧' | '好感' | '沉沦' | '受精';
}>();

const stageIcon = computed(() => {
  const icons = {
    '陌生': 'fa fa-question-circle',
    '暧昧': 'fa fa-heart',
    '好感': 'fa fa-heart',
    '沉沦': 'fa fa-fire',
    '受精': 'fa fa-baby'
  };
  return icons[props.stage];
});
</script>

<style scoped>
.stage-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid;
  transition: all 0.3s ease;
}

.stage-陌生 {
  background: rgba(139, 139, 139, 0.2);
  color: var(--c-text-muted);
  border-color: var(--c-text-muted);
}

.stage-暧昧 {
  background: rgba(255, 107, 157, 0.2);
  color: var(--c-primary);
  border-color: var(--c-primary);
}

.stage-好感 {
  background: rgba(255, 107, 157, 0.3);
  color: var(--c-primary-light);
  border-color: var(--c-primary-light);
  box-shadow: 0 0 10px var(--c-glow-primary);
}

.stage-沉沦 {
  background: rgba(157, 78, 221, 0.3);
  color: var(--c-secondary-light);
  border-color: var(--c-secondary);
  box-shadow: 0 0 10px var(--c-glow-secondary);
  animation: pulse-glow 2s ease-in-out infinite;
}

.stage-受精 {
  background: rgba(255, 23, 68, 0.3);
  color: var(--c-accent-light);
  border-color: var(--c-accent);
  box-shadow: 0 0 15px var(--c-glow-accent);
  animation: heart-beat 1.5s ease-in-out infinite;
}

.stage-tag i {
  font-size: 14px;
}
</style>

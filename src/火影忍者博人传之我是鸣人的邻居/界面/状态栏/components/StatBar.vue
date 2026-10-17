<template>
  <div class="stat-bar">
    <div class="stat-header">
      <div class="stat-label">
        <i :class="`fa ${icon}`"></i>
        <span>{{ label }}</span>
      </div>
      <div class="stat-value">{{ Math.round(value) }} / {{ max }}</div>
    </div>

    <div class="stat-progress-bg">
      <div
        :class="['stat-progress-fill', `type-${type}`]"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: number;
  max: number;
  type: 'affection' | 'obedience' | 'corruption';
  icon: string;
}>();

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100));
});
</script>

<style scoped>
.stat-bar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--c-text-secondary);
}

.stat-label i {
  font-size: 16px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-primary);
}

.stat-progress-bg {
  height: 24px;
  background: var(--c-bg-dark);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--c-border);
  position: relative;
}

.stat-progress-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

/* 各类型进度条渐变 */
.type-affection {
  background: var(--gradient-affection);
  box-shadow: 0 0 10px var(--c-glow-primary);
}

.type-obedience {
  background: var(--gradient-obedience);
  box-shadow: 0 0 8px rgba(92, 156, 230, 0.3);
}

.type-corruption {
  background: var(--gradient-corruption);
  box-shadow: 0 0 12px var(--c-glow-accent);
}

/* 进度条光泽效果 */
.stat-progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* 图标颜色 */
.type-affection .stat-label i {
  color: var(--c-primary);
  animation: heart-beat 1.5s ease-in-out infinite;
}

.type-obedience .stat-label i {
  color: #5C9CE6;
}

.type-corruption .stat-label i {
  color: var(--c-secondary);
}

@media (max-width: 800px) {
  .stat-progress-bg {
    height: 20px;
  }

  .stat-label,
  .stat-value {
    font-size: 12px;
  }
}
</style>

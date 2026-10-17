<template>
  <div class="stage-progress">
    <div class="stage-dots">
      <div
        v-for="(stage, index) in stages"
        :key="stage"
        :class="['stage-dot', getStageClass(stage)]"
        :title="stage"
      >
        <div class="dot-inner"></div>
        <span class="dot-label">{{ stage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStage: '普通' | '动摇并越界' | '沉沦' | '受精怀孕';
}>();

const stages: Array<'普通' | '动摇并越界' | '沉沦' | '受精怀孕'> = [
  '普通',
  '动摇并越界',
  '沉沦',
  '受精怀孕'
];

const getStageClass = (stage: typeof stages[number]) => {
  const currentIndex = stages.indexOf(props.currentStage);
  const stageIndex = stages.indexOf(stage);

  if (stageIndex < currentIndex) {
    return 'completed';
  } else if (stageIndex === currentIndex) {
    return 'current';
  } else {
    return 'future';
  }
};
</script>

<style scoped>
.stage-progress {
  padding: 16px 12px;
  background: var(--c-bg-light);
  border-radius: 8px;
  border: 1px solid var(--c-border);
}

.stage-dots {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* 连接线 */
.stage-dots::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 5%;
  right: 5%;
  height: 2px;
  background: var(--c-border);
  z-index: 0;
}

.stage-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
  position: relative;
}

.dot-inner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid;
  transition: all 0.4s ease;
  background: var(--c-bg-dark);
}

.dot-label {
  font-size: 11px;
  color: var(--c-text-muted);
  white-space: nowrap;
  transition: all 0.3s ease;
}

/* 未达成阶段 */
.stage-dot.future .dot-inner {
  border-color: var(--c-border);
  background: var(--c-bg-dark);
}

.stage-dot.future .dot-label {
  color: var(--c-text-muted);
}

/* 已完成阶段 */
.stage-dot.completed .dot-inner {
  border-color: var(--c-primary);
  background: var(--c-primary);
}

.stage-dot.completed .dot-label {
  color: var(--c-primary);
  font-weight: 500;
}

/* 当前阶段 */
.stage-dot.current .dot-inner {
  border-color: var(--c-accent);
  background: var(--c-accent);
  box-shadow: 0 0 15px var(--c-glow-accent);
  animation: pulse-glow 2s ease-in-out infinite;
}

.stage-dot.current .dot-label {
  color: var(--c-accent);
  font-weight: 600;
}

@media (max-width: 800px) {
  .stage-dots {
    flex-wrap: wrap;
    gap: 12px;
  }

  .stage-dots::before {
    display: none;
  }

  .dot-label {
    font-size: 10px;
  }
}
</style>

<template>
  <div :class="['cycle-indicator', { ovulation: isOvulation }]">
    <div class="cycle-header">
      <div class="cycle-label">
        <i :class="cycleIcon"></i>
        <span>生理日程</span>
      </div>
      <div class="cycle-status">
        <span :class="['status-badge', { ovulation: isOvulation }]">
          {{ isOvulation ? '排卵日' : '安全日' }}
        </span>
        <span class="cycle-day">第 {{ dayInCycle }} / {{ cycleLength }} 天</span>
      </div>
    </div>

    <div class="cycle-progress-bg">
      <div
        :class="['cycle-progress-fill', { ovulation: isOvulation }]"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isOvulation: boolean;
  currentDay: number;
  cycleLength: number;
}>();

const cycleIcon = computed(() => {
  return props.isOvulation ? 'fa fa-circle-dot' : 'fa fa-shield';
});

const dayInCycle = computed(() => {
  const day = ((props.currentDay - 1) % props.cycleLength) + 1;
  return day;
});

const percentage = computed(() => {
  return Math.min(100, (dayInCycle.value / props.cycleLength) * 100);
});
</script>

<style scoped>
.cycle-indicator {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: var(--c-bg-light);
  border-radius: 8px;
  border: 1px solid var(--c-border);
  transition: all 0.3s ease;
}

.cycle-indicator.ovulation {
  border-color: var(--c-danger);
  background: rgba(255, 82, 82, 0.1);
}

.cycle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cycle-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--c-text-secondary);
}

.cycle-label i {
  font-size: 16px;
}

.cycle-indicator.ovulation .cycle-label i {
  color: var(--c-danger);
  animation: breathe 2s ease-in-out infinite;
}

.cycle-indicator:not(.ovulation) .cycle-label i {
  color: var(--c-safe);
}

.cycle-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  background: var(--c-safe);
  color: white;
}

.status-badge.ovulation {
  background: var(--c-danger);
  animation: pulse-glow-danger 2s ease-in-out infinite;
}

.cycle-day {
  font-size: 12px;
  color: var(--c-text-muted);
}

.cycle-progress-bg {
  height: 8px;
  background: var(--c-bg-dark);
  border-radius: 4px;
  overflow: hidden;
}

.cycle-progress-fill {
  height: 100%;
  background: var(--c-safe);
  border-radius: 4px;
  transition: width 0.5s ease-out;
}

.cycle-progress-fill.ovulation {
  background: var(--c-danger);
  box-shadow: 0 0 8px rgba(255, 82, 82, 0.5);
}

@media (max-width: 800px) {
  .cycle-indicator {
    padding: 10px;
  }

  .cycle-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>

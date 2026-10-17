<template>
  <div class="header-bar">
    <div class="header-title">
      <i class="fa fa-cat text-primary"></i>
      <span>火影忍者博人传之我是鸣人的邻居</span>
    </div>
    <div class="header-chips">
      <span class="chip">
        <i class="fa fa-calendar-day"></i>
        第{{ worldData?.日期 ?? 1 }}天
      </span>
      <span class="chip">
        <i class="fa fa-clock"></i>
        {{ worldData?.时间段 ?? '上午' }}
      </span>
      <span class="chip">
        <i class="fa fa-location-dot"></i>
        {{ worldData?.位置 ?? '邻居家' }}
      </span>
      <span :class="['chip', { 'chip-home': isHome }]">
        <i :class="isHome ? 'fa fa-house' : 'fa fa-briefcase'"></i>
        鸣人{{ isHome ? '在家' : '不在家' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type WorldData = {
  日期?: number;
  时间段?: string;
  位置?: string;
  鸣人状态?: string;
} | null;

const props = defineProps<{
  worldData: WorldData;
}>();

const isHome = computed(() => props.worldData?.鸣人状态 === '在家');
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 12px;
  background: var(--c-bg-elevated);
  border-radius: 8px;
  border: 1px solid var(--c-border);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--c-text-primary);
}

.header-title i {
  font-size: 17px;
}

.header-chips {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--c-text-secondary);
  background: var(--c-bg-light);
  border: 1px solid var(--c-border);
}

.chip i {
  font-size: 12px;
}

.chip-home {
  color: var(--c-accent);
  border-color: var(--c-accent-dark);
  animation: pulse-glow-danger 2.5s ease-in-out infinite;
}

@media (max-width: 800px) {
  .header-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

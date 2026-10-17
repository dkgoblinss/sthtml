<template>
  <div class="status-bar-container">
    <!-- 顶部信息栏：日期、时间、位置、鸣人状态 -->
    <HeaderBar :world-data="worldData" />

    <!-- 雏田数值区 -->
    <section class="panel">
      <div class="panel-title">
        <i class="fa fa-heart text-primary"></i>
        <span>雏田</span>
      </div>
      <StatsGrid :hinata-data="hinataData" />
    </section>

    <!-- 关系阶段进度 -->
    <StageProgress :current-stage="currentStage" />

    <!-- 生理日程 -->
    <CycleIndicator
      :is-ovulation="isOvulation"
      :current-day="currentDay"
      :cycle-length="10"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';
import HeaderBar from './components/HeaderBar.vue';
import StatsGrid from './components/StatsGrid.vue';
import StageProgress from './components/StageProgress.vue';
import CycleIndicator from './components/CycleIndicator.vue';

const store = useDataStore();

const worldData = computed(() => store.data?.世界 ?? null);
const hinataData = computed(() => store.data?.雏田 ?? null);
const currentStage = computed(() => hinataData.value?.关系阶段 ?? '普通');
const isOvulation = computed(() => hinataData.value?.生理日程 === '排卵日');
const currentDay = computed(() => worldData.value?.日期 ?? 1);
</script>

<style scoped>
.status-bar-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 560px;
  padding: 12px;
  background: var(--c-bg-dark);
  border-radius: 12px;
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-lg);
  animation: fade-in 0.4s ease-out;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--c-bg-light);
  border-radius: 8px;
  border: 1px solid var(--c-border);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-primary);
}

.panel-title i {
  font-size: 16px;
}

@media (max-width: 800px) {
  .status-bar-container {
    min-width: unset;
    padding: 8px;
    gap: 8px;
  }
}
</style>

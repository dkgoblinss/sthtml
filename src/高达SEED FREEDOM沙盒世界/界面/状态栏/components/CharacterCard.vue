<template>
  <div class="character-card">
    <div class="card-header" @click="toggleExpand">
      <div class="character-name">
        <i class="fas fa-user"></i>
        <span>{{ characterName }}</span>
      </div>
      <i :class="['fas', expanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
    </div>
    
    <transition name="expand">
      <div v-show="expanded" class="card-body">
        <!-- 状态指示区 -->
        <div class="status-indicators">
          <div class="ovulation-indicator" :class="{ active: isOvulation }">
            <i class="fas fa-heart"></i>
            <span>{{ isOvulation ? '排卵日' : '安全日' }}</span>
          </div>
          <div class="fertility-icon">
            <i class="fas fa-venus"></i>
          </div>
          <div class="conception-desire">
            <span class="label">受孕欲望</span>
            <span class="value">{{ conceptionDesire }}%</span>
          </div>
        </div>

        <!-- 数值显示区 -->
        <div class="stats-area">
          <div class="stat-item affection">
            <div class="stat-header">
              <i class="fas fa-heart"></i>
              <span>好感度</span>
            </div>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: affection + '%' }"></div>
            </div>
            <div class="stat-value">{{ affection }} / 100</div>
          </div>

          <div class="stat-item corruption">
            <div class="stat-header">
              <i class="fas fa-fire"></i>
              <span>淫乱出轨值</span>
            </div>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: corruption + '%' }"></div>
            </div>
            <div class="stat-value">{{ corruption }} / 100</div>
          </div>
        </div>

        <!-- 生理日程可视化 -->
        <div class="cycle-calendar">
          <div class="calendar-header">
            <i class="fas fa-calendar-alt"></i>
            <span>生理日程</span>
          </div>
          <div class="calendar-days">
            <div
              v-for="day in 8"
              :key="day"
              class="calendar-day"
              :class="{
                active: day === cycleDay,
                ovulation: day <= 4
              }"
            >
              <span>{{ day }}</span>
              <i v-if="day <= 4" class="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  characterName: string;
  affection: number;
  corruption: number;
  cycleStatus: string;
  cycleDay: number;
  conceptionDesire: number;
  defaultExpanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false
});

const expanded = ref(props.defaultExpanded);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const isOvulation = computed(() => props.cycleStatus === '排卵日');
</script>

<style scoped>
.character-card {
  margin-bottom: 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.card-header:hover {
  background: rgba(255, 20, 147, 0.1);
}

.character-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
}

.character-name i {
  color: var(--c-primary);
}

.card-body {
  padding: 12px;
  border-top: 1px solid var(--c-border);
}

/* 状态指示区 */
.status-indicators {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.ovulation-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 13px;
  transition: all 0.3s ease;
}

.ovulation-indicator.active {
  background: var(--c-ovulation);
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

.ovulation-indicator i {
  font-size: 14px;
}

.fertility-icon {
  font-size: 24px;
  color: var(--c-primary);
}

.conception-desire {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}

.conception-desire .label {
  font-size: 11px;
  color: var(--c-text-secondary);
}

.conception-desire .value {
  font-size: 18px;
  font-weight: 700;
  color: var(--c-primary);
}

/* 数值显示区 */
.stats-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
}

.stat-item.affection .stat-header i {
  color: var(--c-affection);
}

.stat-item.corruption .stat-header i {
  color: var(--c-corruption);
}

.stat-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary), var(--c-primary-dark));
  transition: width 0.5s ease;
}

.stat-item.affection .stat-fill {
  background: var(--c-affection);
}

.stat-item.corruption .stat-fill {
  background: var(--c-corruption);
}

.stat-value {
  font-size: 12px;
  color: var(--c-text-secondary);
  text-align: right;
}

/* 生理日程可视化 */
.cycle-calendar {
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.calendar-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
}

.calendar-header i {
  color: var(--c-primary);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}

.calendar-day {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.2s ease;
}

.calendar-day.ovulation {
  background: rgba(255, 105, 180, 0.2);
}

.calendar-day.active {
  background: var(--c-primary);
  box-shadow: 0 0 8px rgba(255, 20, 147, 0.6);
  transform: scale(1.1);
}

.calendar-day i {
  font-size: 10px;
  color: var(--c-ovulation);
  margin-top: 2px;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

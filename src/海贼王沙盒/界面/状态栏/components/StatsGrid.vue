<template>
  <div class="stats-grid">
    <!-- 好感度 -->
    <StatBar
      label="好感度"
      :value="characterData.好感度"
      :max="100"
      type="affection"
      icon="fa-heart"
    />
    
    <!-- 性欲值 -->
    <StatBar
      label="性欲值"
      :value="characterData.性欲值"
      :max="100"
      type="lust"
      icon="fa-fire"
    />
    
    <!-- 理性值 -->
    <StatBar
      label="理性值"
      :value="characterData.理性值"
      :max="100"
      type="rationality"
      icon="fa-brain"
    />
    
    <!-- 受孕欲望 -->
    <StatBar
      label="受孕欲望"
      :value="breedingDesire"
      :max="100"
      type="breeding"
      icon="fa-droplet"
    />
    
    <!-- 生理周期 -->
    <CycleIndicator
      :is-ovulation="characterData.是否排卵日"
      :current-day="characterData.当前周期第几天"
      :cycle-length="characterData.是否排卵日 ? characterData.排卵日周期天数 : characterData.安全日周期天数"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatBar from './StatBar.vue';
import CycleIndicator from './CycleIndicator.vue';

const props = defineProps<{
  characterData: {
    好感度: number;
    性欲值: number;
    理性值: number;
    受孕欲望: number;
    是否排卵日: boolean;
    当前周期第几天: number;
    排卵日周期天数: number;
    安全日周期天数: number;
  };
}>();

// 计算受孕欲望（公式：(好感度×0.3 + 性欲值×0.4 - 理性值×0.3) × (排卵日 ? 1.5 : 1.0)）
const breedingDesire = computed(() => {
  const base = 
    props.characterData.好感度 * 0.3 +
    props.characterData.性欲值 * 0.4 -
    props.characterData.理性值 * 0.3;
  
  const multiplier = props.characterData.是否排卵日 ? 1.5 : 1.0;
  
  return Math.max(0, Math.min(100, base * multiplier));
});
</script>

<style scoped>
.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 800px) {
  .stats-grid {
    gap: 10px;
  }
}
</style>

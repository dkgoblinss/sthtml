<template>
  <div class="stats-grid">
    <StatBar
      label="好感度"
      :value="hinataData?.好感度 ?? 0"
      :max="100"
      type="affection"
      icon="fa-heart"
    />
    <StatBar
      label="顺从度"
      :value="hinataData?.顺从度 ?? 0"
      :max="100"
      type="obedience"
      icon="fa-hand"
    />
    <StatBar
      label="堕落度"
      :value="hinataData?.堕落度 ?? 0"
      :max="100"
      type="corruption"
      icon="fa-fire"
    />
  </div>
</template>

<script setup lang="ts">
import StatBar from './StatBar.vue';

type HinataData = {
  好感度?: number;
  顺从度?: number;
  堕落度?: number;
} | null;

defineProps<{
  hinataData: HinataData;
}>();
</script>

<style scoped>
.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

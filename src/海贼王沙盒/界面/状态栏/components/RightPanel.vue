<template>
  <div class="right-panel">
    <!-- 顶部标题栏 -->
    <HeaderBar 
      :character-name="currentCharacter"
      :stage="characterData?.关系阶段 || '陌生'"
      @show-ntr="showNtrModal = true"
    />
    
    <!-- 数值网格 -->
    <StatsGrid 
      v-if="characterData"
      :character-data="characterData"
    />
    
    <!-- 关系阶段指示器 -->
    <StageProgress 
      v-if="characterData"
      :current-stage="characterData.关系阶段"
    />
    
    <!-- NTR 弹窗 -->
    <NtrModal 
      v-if="showNtrModal && characterData"
      :ntr-data="characterData.ntr_status"
      @close="showNtrModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderBar from './HeaderBar.vue';
import StatsGrid from './StatsGrid.vue';
import StageProgress from './StageProgress.vue';
import NtrModal from './NtrModal.vue';

defineProps<{
  characterData: {
    姓名: string;
    好感度: number;
    性欲值: number;
    理性值: number;
    受孕欲望: number;
    关系阶段: '陌生' | '暧昧' | '好感' | '沉沦' | '受精';
    生理周期天数: number;
    当前周期第几天: number;
    是否排卵日: boolean;
    排卵日周期天数: number;
    安全日周期天数: number;
    是否已受精: boolean;
    怀孕天数: number;
    ntr_status: {
      发生次数: number;
      最近发生日期?: string;
    };
  } | null;
  currentCharacter: string;
}>();

const showNtrModal = ref(false);
</script>

<style scoped>
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  background: var(--c-bg-dark);
  position: relative;
}

@media (max-width: 800px) {
  .right-panel {
    padding: 12px;
  }
}
</style>

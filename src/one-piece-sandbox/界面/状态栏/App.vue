<template>
  <div class="status-panel">
    <!-- 标题栏 -->
    <div class="header">
      <h2 class="title">草帽团女性角色状态</h2>
      <button class="secret-btn" @click="showNTRPopup = true">
        <i class="fas fa-eye-slash"></i>
        秘密
      </button>
    </div>

    <!-- 系统信息 -->
    <div class="system-info">
      <div class="system-item">
        <i class="fas fa-calendar"></i>
        <span>{{ store.data.stat_data?.系统?.当前日期 || '未知' }}</span>
      </div>
      <div class="system-item">
        <i class="fas fa-clock"></i>
        <span>{{ store.data.stat_data?.系统?.当前时间段 || '未知' }}</span>
      </div>
      <div class="system-item">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ store.data.stat_data?.系统?.当前地点 || '未知' }}</span>
      </div>
    </div>

    <!-- 角色切换器 -->
    <div class="character-selector">
      <div 
        v-for="char in characters" 
        :key="char"
        class="character-tab"
        :class="{ active: selectedCharacter === char }"
        @click="selectedCharacter = char"
      >
        {{ char }}
      </div>
    </div>

    <!-- 角色详情 -->
    <div v-if="currentCharData" class="character-detail">
      <!-- 头像 -->
      <div class="portrait-section">
        <img 
          :src="getPortraitUrl(selectedCharacter)" 
          :alt="selectedCharacter"
          class="portrait"
        >
      </div>

      <!-- 数值网格 -->
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-header">
            <i class="fas fa-heart"></i>
            <span>好感度</span>
          </div>
          <div class="stat-value">{{ currentCharData.好感度 || 0 }} / 100</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${currentCharData.好感度 || 0}%` }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <i class="fas fa-fire"></i>
            <span>性欲值</span>
          </div>
          <div class="stat-value" :class="{ high: (currentCharData.性欲值 || 0) > 60 }">
            {{ currentCharData.性欲值 || 0 }} / 100
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${currentCharData.性欲值 || 0}%` }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <i class="fas fa-brain"></i>
            <span>理性值</span>
          </div>
          <div class="stat-value">{{ currentCharData.理性值 || 0 }} / 100</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${currentCharData.理性值 || 0}%` }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <i class="fas fa-baby"></i>
            <span>受孕欲望</span>
          </div>
          <div class="stat-value" :class="{ high: (currentCharData.受孕欲望 || 0) > 75 }">
            {{ currentCharData.受孕欲望 || 0 }} / 100
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${currentCharData.受孕欲望 || 0}%` }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <i class="fas fa-link"></i>
            <span>关系阶段</span>
          </div>
          <div class="stat-value">{{ currentCharData.关系阶段 || '陌生' }}</div>
        </div>
      </div>

      <!-- 生理周期 -->
      <div class="cycle-section">
        <div class="cycle-header">
          <span style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-calendar-alt"></i>
            生理周期
          </span>
          <span 
            class="cycle-state" 
            :class="{ 
              ovulation: currentCharData.生理周期?.当前状态 === '排卵日',
              safe: currentCharData.生理周期?.当前状态 === '安全日'
            }"
          >
            {{ currentCharData.生理周期?.当前状态 || '未知' }}
          </span>
        </div>
        <div style="font-size: 0.9rem; color: var(--c-text-secondary);">
          进度：第 {{ currentCharData.生理周期?.当前进度 || 0 }} / {{ currentCharData.生理周期?.周期天数 || 0 }} 天
        </div>
        <div class="progress-bar" style="margin-top: 8px;">
          <div 
            class="progress-fill" 
            :style="{ width: `${getCycleProgress()}%` }"
          ></div>
        </div>
        <div style="font-size: 0.85rem; color: var(--c-text-secondary); margin-top: 4px;">
          下次切换：{{ currentCharData.生理周期?.下次切换日期 || '未知' }}
        </div>
      </div>

      <!-- 怀孕状态 -->
      <div 
        class="pregnancy-status"
        :class="{ pregnant: currentCharData.怀孕状态 === '已怀孕' }"
      >
        <i class="fas fa-user-pregnant"></i>
        {{ currentCharData.怀孕状态 || '未怀孕' }}
      </div>
    </div>

    <!-- NTR 弹窗 -->
    <div v-if="showNTRPopup" class="ntr-overlay" @click.self="showNTRPopup = false">
      <div class="ntr-popup">
        <button class="close-btn" @click="showNTRPopup = false">
          <i class="fas fa-times"></i>
        </button>
        
        <h3 class="ntr-title">🔒 NTR 秘密档案</h3>

        <!-- 角色切换 -->
        <div class="character-selector">
          <div 
            v-for="char in characters" 
            :key="char"
            class="character-tab"
            :class="{ active: ntrSelectedChar === char }"
            @click="ntrSelectedChar = char"
          >
            {{ char }}
          </div>
        </div>

        <div v-if="currentNTRData">
          <!-- NTR 次数 -->
          <div class="ntr-count">
            累计被 NTR 次数：{{ currentNTRData.被NTR次数 || 0 }} 次
          </div>

          <!-- NTR 记录 -->
          <div v-if="currentNTRData.近期NTR记录?.length" class="ntr-records">
            <h4 style="margin-bottom: 12px; color: var(--c-primary-dark);">近期记录：</h4>
            <div 
              v-for="(record, index) in currentNTRData.近期NTR记录" 
              :key="index"
              class="ntr-record"
            >
              <div class="record-date">{{ record.日期 }}</div>
              <div class="record-detail">
                对象：{{ record.对象 }} | 地点：{{ record.地点 }} | 手段：{{ record.手段 }}
              </div>
            </div>
          </div>
          <div v-else style="text-align: center; color: var(--c-text-secondary); padding: 20px;">
            暂无记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();

const characters = ['娜美', '薇薇', '罗宾'];
const selectedCharacter = ref('娜美');
const ntrSelectedChar = ref('娜美');
const showNTRPopup = ref(false);

const currentCharData = computed(() => {
  return store.data.stat_data?.[selectedCharacter.value];
});

const currentNTRData = computed(() => {
  return store.data.stat_data?.[ntrSelectedChar.value]?.NTR状态;
});

const getCycleProgress = () => {
  const current = currentCharData.value?.生理周期?.当前进度 || 0;
  const total = currentCharData.value?.生理周期?.周期天数 || 1;
  return Math.round((current / total) * 100);
};

const getPortraitUrl = (charName: string) => {
  // 占位图片，用户可自行替换
  const portraits: Record<string, string> = {
    '娜美': 'https://via.placeholder.com/150/ff69b4/ffffff?text=Nami',
    '薇薇': 'https://via.placeholder.com/150/c71585/ffffff?text=Vivi',
    '罗宾': 'https://via.placeholder.com/150/8b008b/ffffff?text=Robin',
  };
  return portraits[charName] || 'https://via.placeholder.com/150';
};
</script>

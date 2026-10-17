<template>
  <div class="status-bar-container">
    <div class="status-bar-header">
      <div class="header-left">
        <i class="fas fa-chart-line"></i>
        <span class="title">角色状态</span>
      </div>
      <div class="header-right">
        <div class="datetime-info">
          <i class="fas fa-clock"></i>
          <span>{{ systemData.当前日期 }} {{ systemData.当前时间 }}</span>
        </div>
        <div class="location-info">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ systemData.当前地点 }}</span>
        </div>
      </div>
    </div>

    <div class="characters-container">
      <CharacterCard
        character-name="拉克丝·克莱因"
        :affection="lacusData.好感度"
        :corruption="lacusData.淫乱出轨值"
        :cycle-status="lacusData.生理日程.当前状态"
        :cycle-day="lacusData.生理日程.周期天数"
        :conception-desire="lacusData.受孕欲望"
        :default-expanded="true"
      />

      <CharacterCard
        character-name="露娜玛利亚·霍克"
        :affection="lunamariaData.好感度"
        :corruption="lunamariaData.淫乱出轨值"
        :cycle-status="lunamariaData.生理日程.当前状态"
        :cycle-day="lunamariaData.生理日程.周期天数"
        :conception-desire="lunamariaData.受孕欲望"
      />

      <CharacterCard
        character-name="卡嘉丽·尤拉·阿斯哈"
        :affection="cagalliData.好感度"
        :corruption="cagalliData.淫乱出轨值"
        :cycle-status="cagalliData.生理日程.当前状态"
        :cycle-day="cagalliData.生理日程.周期天数"
        :conception-desire="cagalliData.受孕欲望"
      />
    </div>

    <div class="relationship-status">
      <div class="relationship-header">
        <i class="fas fa-link"></i>
        <span>原作关系状态</span>
      </div>
      <div class="relationship-items">
        <div class="relationship-item">
          <span class="couple">基拉 × 拉克丝</span>
          <span class="status" :class="getRelationshipClass(relationshipData.基拉与拉克丝)">
            {{ relationshipData.基拉与拉克丝 }}
          </span>
        </div>
        <div class="relationship-item">
          <span class="couple">阿斯兰 × 卡嘉丽</span>
          <span class="status" :class="getRelationshipClass(relationshipData.阿斯兰与卡嘉丽)">
            {{ relationshipData.阿斯兰与卡嘉丽 }}
          </span>
        </div>
        <div class="relationship-item">
          <span class="couple">真飞鸟 × 露娜玛利亚</span>
          <span class="status" :class="getRelationshipClass(relationshipData.真飞鸟与露娜玛利亚)">
            {{ relationshipData.真飞鸟与露娜玛利亚 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';
import CharacterCard from './components/CharacterCard.vue';

const store = useDataStore();

const systemData = computed(() => store.data.系统);
const lacusData = computed(() => store.data.拉克丝);
const lunamariaData = computed(() => store.data.露娜玛利亚);
const cagalliData = computed(() => store.data.卡嘉丽);
const relationshipData = computed(() => store.data.原作关系状态);

const getRelationshipClass = (status: string) => {
  switch (status) {
    case '稳定':
      return 'stable';
    case '裂痕':
      return 'cracked';
    case '破裂':
      return 'broken';
    default:
      return '';
  }
};
</script>

<style scoped>
.status-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--c-primary);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-left i {
  font-size: 18px;
  color: var(--c-primary);
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: var(--c-text);
}

.header-right {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.datetime-info,
.location-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--c-text-secondary);
}

.datetime-info i,
.location-info i {
  color: var(--c-primary);
}

.characters-container {
  margin-bottom: 16px;
}

/* 原作关系状态 */
.relationship-status {
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--c-border);
  border-radius: 6px;
}

.relationship-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
}

.relationship-header i {
  color: var(--c-primary);
}

.relationship-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.relationship-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  font-size: 13px;
}

.couple {
  color: var(--c-text);
}

.status {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status.stable {
  background: rgba(76, 175, 80, 0.3);
  color: #4CAF50;
}

.status.cracked {
  background: rgba(255, 152, 0, 0.3);
  color: #FF9800;
}

.status.broken {
  background: rgba(244, 67, 54, 0.3);
  color: #F44336;
}
</style>

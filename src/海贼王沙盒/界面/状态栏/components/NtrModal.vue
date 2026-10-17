<template>
  <div class="ntr-modal-overlay" @click="$emit('close')">
    <div class="ntr-modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i class="fa fa-eye-slash"></i>
          隐秘记录
        </h3>
        <button class="close-button" @click="$emit('close')">
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="ntr-stat">
          <div class="stat-icon">
            <i class="fa fa-chart-line"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">发生次数</div>
            <div class="stat-value">{{ ntrData.发生次数 }}次</div>
          </div>
        </div>
        
        <div class="ntr-stat">
          <div class="stat-icon">
            <i class="fa fa-calendar"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">最近发生</div>
            <div class="stat-value">
              {{ ntrData.最近发生日期 || '无记录' }}
            </div>
          </div>
        </div>
        
        <div v-if="ntrData.发生次数 > 0" class="warning-text">
          <i class="fa fa-exclamation-triangle"></i>
          她的身体已经记住了其他人的感觉...
        </div>
        
        <div v-else class="safe-text">
          <i class="fa fa-check-circle"></i>
          目前为止，她还只属于你一个人
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  ntrData: {
    发生次数: number;
    最近发生日期?: string;
  };
}>();

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.ntr-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fade-in 0.3s ease-out;
}

.ntr-modal {
  background: var(--c-bg-dark);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  box-shadow: var(--shadow-lg), 0 0 30px var(--c-glow-primary);
  width: 90%;
  max-width: 400px;
  animation: fade-in 0.4s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--c-border);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0;
}

.modal-title i {
  color: var(--c-primary);
}

.close-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--c-text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.close-button:hover {
  background: var(--c-bg-elevated);
  color: var(--c-text-primary);
}

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ntr-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--c-bg-light);
  border-radius: 12px;
  border: 1px solid var(--c-border);
  transition: all 0.3s ease;
}

.ntr-stat:hover {
  border-color: var(--c-primary);
  box-shadow: 0 0 10px var(--c-glow-primary);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--c-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--c-text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text-primary);
}

.warning-text,
.safe-text {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.warning-text {
  background: rgba(255, 82, 82, 0.1);
  color: var(--c-danger);
  border: 1px solid var(--c-danger);
}

.safe-text {
  background: rgba(76, 175, 80, 0.1);
  color: var(--c-safe);
  border: 1px solid var(--c-safe);
}

.warning-text i,
.safe-text i {
  font-size: 16px;
}

@media (max-width: 800px) {
  .ntr-modal {
    width: 95%;
  }
  
  .modal-header,
  .modal-body {
    padding: 16px;
  }
}
</style>

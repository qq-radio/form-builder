<template>
  <div class="button">
    <img class='icon' :src="icon" />
    获取地理位置
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/location-white.png';
</script>

<style lang="less" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px;
  background-color: #0960bd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;

  .icon {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
}
</style>

<template>
  <div class="rate">
    <img v-for="(icon, index )  in images" class="icon" :src="icon" :key="index" />
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/rate.png';

const images = new Array(5).fill(icon) 
</script>

<style lang="less" scoped>
.rate {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: not-allowed;

  .icon {
    width: 34px;
    height: 34px;
    margin-right: 8px;
  }
}
</style>

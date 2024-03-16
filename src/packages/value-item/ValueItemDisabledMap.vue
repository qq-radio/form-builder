<template>
  <div class="flex w-full cursor-not-allowed items-center justify-center rounded bg-blue-500/70 p-1.5 text-white">
    <img class="mr-3 h-4 w-4" :src="icon" />获取地理位置
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/location-white.png'
</script>

<template>
  <div class="flex cursor-not-allowed items-center">
    <img v-for="(icon, index) in images" class="mr-2 h-9 w-9" :src="icon" :key="index" />
  </div>
</template>

<script setup lang="ts">
import icon from '@/assets/rate.png'

const images = new Array(5).fill(icon)
</script>

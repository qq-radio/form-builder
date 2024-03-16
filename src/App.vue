<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0
      }
    }"
  >
    <div>
      <RouterView />
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

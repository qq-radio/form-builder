<template>
  <div class="mb-2.5 flex items-center justify-between bg-white px-4 py-3">
    <div class="text-lg font-semibold">创建表单</div>
    <div>
      <a-button class="mr-2.5" type="primary" @click="openPreviewJsonModal">JSON预览</a-button>
      <a-button class="mr-2.5">表单预览</a-button>
      <a-button>查看数据</a-button>
      <PreviewJsonModal v-model:visible="isPreviewJsonModalVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder'
import PreviewJsonModal from './PreviewJsonModal.vue'

const { getForm } = useFormBuilder()

const isPreviewJsonModalVisible = ref(false)
const previewJsonParams = ref()

const openPreviewJsonModal = () => {
  previewJsonParams.value = getForm.value
  isPreviewJsonModalVisible.value = true
}
</script>

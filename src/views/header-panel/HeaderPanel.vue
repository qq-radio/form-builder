<template>
  <div>
    <a-button type="primary">表单预览</a-button>
    <a-button @click="openPreviewJsonModal">JSON预览</a-button>
    <a-button v-if="false" type="primary">查看数据</a-button>
    <PreviewJsonModal v-model:visible="isShowPreviewJsonModal" />
  </div>
</template>

<script setup lang="ts">
import { useFormBuilder } from '@/composables/useFormBuilder';

import PreviewJsonModal from './PreviewJsonModal.vue';

const {
  getForm,
} = useFormBuilder()


const isShowPreviewJsonModal = ref(false);
const previewJsonParams = ref();

const openPreviewJsonModal = () => {
  previewJsonParams.value = getForm.value
  isShowPreviewJsonModal.value = true;
}
</script>

<style lang="less" scoped>
.ant-btn {
  margin-right: 6px;
}
</style>
